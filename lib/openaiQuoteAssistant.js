const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-5.5";

function normalizePayload(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
}

function buildPrompt(formData) {
  const {
    name = "",
    department = "",
    product = "",
    volume = "",
    clinicalContext = "",
  } = formData;

  return [
    "You are a clinical product specialist for CitraFlow catheter lock solutions.",
    "Write a concise, professional reply for a healthcare buyer or clinician.",
    "Do not invent regulatory claims, patient-specific medical advice, or unsupported efficacy data.",
    "Use only the site context provided: CitraFlow 4% is positioned for routine maintenance and CitraFlow 30% for high-risk access.",
    "Structure the response with these exact headings:",
    "Recommended Approach",
    "Why This Product",
    "Suggested Follow-Up",
    "",
    "Lead details:",
    `Name or facility: ${name}`,
    `Department: ${department}`,
    `Product of interest: ${product}`,
    `Estimated monthly volume: ${volume}`,
    `Clinical context: ${clinicalContext || "None provided."}`,
  ].join("\n");
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (!Array.isArray(data.output)) {
    return "";
  }

  const chunks = [];

  for (const item of data.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (content.type === "output_text" && typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

async function createQuoteReply(formData, apiKey) {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: buildPrompt(formData),
      reasoning: {
        effort: "medium",
      },
      text: {
        format: {
          type: "text",
        },
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || "OpenAI request failed.";
    throw new Error(message);
  }

  const reply = extractOutputText(data);

  if (!reply) {
    throw new Error("The OpenAI response did not include any text.");
  }

  return {
    model: OPENAI_MODEL,
    reply,
  };
}

module.exports = {
  OPENAI_MODEL,
  createQuoteReply,
  normalizePayload,
};
