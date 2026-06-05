import ai from "./geminiClient.js";

const ALLOWED_CATEGORIES = [
  "IT Support",
  "Network & Internet",
  "Hardware Issue",
  "Software Issue",
  "Access Request",
  "HR Concern",
  "Payroll Issue",
  "Facilities & Maintenance",
  "Security Issue",
  "Other",
];

export const predictCategory = async (title, description) => {
  try {
    const prompt = `
You are a complaint classification system.

Allowed Categories:
${ALLOWED_CATEGORIES.join("\n")}

Complaint Title:
${title}

Complaint Description:
${description}

Rules:
- Return ONLY ONE category.
- Response must exactly match one category from the list.
- Do not explain.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const category = response.text.trim();

    if (ALLOWED_CATEGORIES.includes(category)) {
      return category;
    }

    return "Other";
  } catch (error) {
    console.error("Category Prediction Error:", error);

    return "Other";
  }
};
