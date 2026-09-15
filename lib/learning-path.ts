import {z} from "zod";
import type {learningPathRequest} from "../schemas/formSchemas";


export const learningStepsSchema = z.object({
    position: z.number().int().positive(),
    title: z.string().trim().min(1),
})

export const learningPathResponseSchema = z.object({
    targetRole: z.string().trim().min(1),
    steps: z.array(learningStepsSchema).min(2),
})

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
      "title": "Step title"
    }
  ]
}

Requirements:
- Include at least 2 ordered learning steps.
- Personalize the steps using the provided information.
- Keep every step relevant to the career goal.
- Do not include Markdown or any text outside the JSON.
`.trim();
}



export type LearningPathResponse = z.infer<typeof learningPathResponseSchema>;


