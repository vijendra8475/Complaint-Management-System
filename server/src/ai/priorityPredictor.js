import ai from "./geminiClient.js";

const ALLOWED_PRIORITIES = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

export const predictPriority = async (
  title,
  description
) => {
  try {
    const prompt = `
You are a complaint priority prediction system.

Allowed Priorities:

Low
Medium
High
Critical

Complaint Title:
${title}

Complaint Description:
${description}

Rules:
- Return ONLY ONE priority.
- No explanation.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const priority =
      response.text.trim();

    if (
      ALLOWED_PRIORITIES.includes(priority)
    ) {
      return priority;
    }

    return "Medium";

  } catch (error) {
    console.error(
      "Priority Prediction Error:",
      error
    );

    return "Medium";
  }
};