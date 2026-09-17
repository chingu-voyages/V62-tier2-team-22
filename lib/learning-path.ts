import type { learningPathRequest } from "../schemas/formSchemas";

export function buildLearningPathPrompt(
  data: learningPathRequest
): string {
  const optionalFields = [
    data.relevantExperience
    ? `Relevant experience: ${data.relevantExperience}`
    : "",

    data.whyGoalMatters
    ? `Why this goal matters: ${data.whyGoalMatters}`
    : "",

    data.learningPreference
    ? `Learning preference: ${data.learningPreference}`
    : "",

  ]

  return `
Create a personalized learning path based on this learner's information:

Career goal: ${data.targetRole}
Current skill level: ${data.currentLevel}
Background: ${data.background}
Existing skills: ${data.skills.join(", ")}
Available learning time: ${data.availableTime} hours per week
Target timeframe: ${data.desiredTimeframe}
${optionalFields.filter(Boolean).join("\n")}

Return only valid JSON in this format:
{
  "targetRole": "${data.targetRole}",
  "steps": [
    {
      "position": 1,
      "title": "Step title",
      "description": "What the learner should learn or accomplish in this step",
      "whyItMatters": "Why this step is important for achieving the career goal",
      "estimatedTime": "Estimated completion time"
    }
  ]
}

Requirements:
- Include at least 2 ordered learning steps.
- Give each step a clear and specific title.
- Clearly describe what the learner should learn or accomplish.
- Explain why each step matters for reaching the learner's career goal.
- Provide a realistic estimated time for each step.
- Base the time estimates on the learner's available weekly hours and target timeframe.
- Include enough information for the learner to understand what is expected at each stage.
- Personalize every step using all provided learner information.
- Do not include Markdown or text outside the JSON.
`.trim();
}

