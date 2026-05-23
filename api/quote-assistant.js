const {
  createQuoteReply,
  normalizePayload,
} = require("../lib/openaiQuoteAssistant");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "Missing OPENAI_API_KEY environment variable." });
    return;
  }

  try {
    const formData = normalizePayload(req.body);
    const result = await createQuoteReply(formData, apiKey);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error.",
    });
  }
};
