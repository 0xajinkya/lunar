const CompanyDetectionPrompt = (context: string) => {
  return `
  Extract only the names of prominent companies (e.g. Apple, Google, Microsoft) mentioned in the text below.
  
  ⚠️ Strictly return a valid JSON object with this structure only:
  {
    "companies": ["Company1", "Company2"]
  }
  
  ❌ Do not include \`\`\`json, markdown, explanation, or any extra text.
  
  If no company names are found, return:
  {
    "companies": []
  }
  
  Text:
  "${context}"
  `;
};

export const GemmaPrompt = {
  CompanyDetectionPrompt
};