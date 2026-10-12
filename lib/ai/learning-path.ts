import type { learningPathRequest } from "../../schemas/formSchemas";

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

	data.skills
	? `Existing skills : ${data.skills}`
	: ""
  ]

  return `
Create a personalized learning path based on this learner's information:

Career goal: ${data.targetRole}
Current skill level: ${data.currentLevel}
Background: ${data.background}
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
      "estimatedTime": "Estimated completion time",
      "resources": [{
        "title": "Resource title",
        "type": "documentation",
        "url": "https://example.com/resource",
        "isFree": true
      }]
    }
  ]
}

Requirements:
- If Career goal didn't refer to an actual role, abort and return an error
- Generate between 3 and 10 ordered learning steps.
- Give each step a clear and specific title.
- Focus each step on one main skill or learning outcome.
- Do not combine multiple complex subjects into one step.
- Split large or advanced subjects into separate steps.
- Keep each description concise and focused on what the learner should accomplish.
- Explain why each step matters for reaching the learner's career goal.
- Provide a short and realistic estimated time for each step.
- Base the time estimates on the learner's available weekly hours and target timeframe.
- Make sure the combined time estimates fit within the learner's target timeframe.
- Personalize every step using all provided learner information.
- Do not include Markdown or text outside the JSON.
- Suggest 3 to 5 relevant learning resources per step when suitable resources are known, so alternatives are available if some links fail verification.
- Match resources to the step's main learning outcome and the learner's current level.
- Each resource must include a specific title, type, direct HTTPS URL, and isFree.
- Resource type must be course, article, video, or documentation.
- Include a mix of free and paid resources when suitable options are known.
- Set isFree to true for free resources and false for resources that require payment to access the recommended content.
- Do not label a paid course as free just because it offers a free preview.- Include a mix of courses, videos, articles, and documentation where appropriate.
- Do not rely only on documentation when suitable courses or videos are known.- Prioritize relevance and quality over quantity.
- Do not invent resources or URLs, or use placeholder links such as example.com, to reach the requested number.
- If no suitable resources are known for a step, return an empty resources array.
- Classify a resource as "course" only if it provides a structured sequence of lessons.
- Do not classify games, standalone exercises, or tools as courses.
- Only recommend resources that accurately fit the supported types: course, article, video, or documentation.
- Prefer structured courses or video lessons when suitable options are known.
`.trim();
}

