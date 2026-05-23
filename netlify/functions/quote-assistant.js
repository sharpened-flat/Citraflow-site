const {
  createQuoteReply,
  normalizePayload,
} = require("../../lib/openaiQuoteAssistant");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY environment variable." }),
    };
  }

  try {
    const formData = normalizePayload(event.body);
    const result = await createQuoteReply(formData, apiKey);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown server error.",
      }),
    };
  }
};
