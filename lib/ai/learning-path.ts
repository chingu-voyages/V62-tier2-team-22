import type { learningPathRequest } from "../../schemas/formSchemas";

export function buildLearningPathPrompt(data: learningPathRequest): string {
  const levelGuidance: Record<string, string> = {
    Beginner:
      "Start with prerequisites and fundamentals. Recommend resources that explain concepts from the beginning and provide guided practice. Avoid advanced reference material, inspiration galleries, and tools presented as lessons.",
    Intermediate:
      "Skip fundamentals the learner already knows. Recommend practical tutorials, applied courses, and resources that help them build and improve real work.",
    Advanced:
      "Skip beginner introductions. Focus on deeper techniques, trade-offs, and real-world decisions for the target role. Good sources include official documentation sections, engineering blogs from reputable companies, conference talks, well-known books' companion pages, and in-depth courses. If a topic has no dedicated course, prefer the official documentation or specification for it.",
  };

  const preferenceGuidance: Record<string, string> = {
    "Project-based":
      "Favor resources that teach through building a relevant project or completing a guided practical task. A gallery of finished examples is not a project tutorial.",
    "Structured lessons":
      "Favor organized courses, lesson series, and clearly sequenced learning material.",
    "Reading-first":
      "Favor clear articles, written tutorials, and documentation that teaches the specific skill.",
    Mixed:
      "Use a useful mix of courses, videos, written tutorials, and documentation when they genuinely fit the step.",
  };

  const weeklyHours = data.availableTime;
  const paceGuidance =
    weeklyHours <= 5
      ? "Keep steps small and prioritize short, focused learning resources that fit limited weekly study time."
      : weeklyHours <= 10
        ? "Balance focused lessons with practical exercises that fit the learner's weekly study time."
        : "Allow more substantial lessons and practice, while keeping each step realistic for the available weekly hours.";

  const optionalFields = [
    data.skills ? `Existing skills: ${data.skills}` : "",
    data.relevantExperience
      ? `Relevant experience: ${data.relevantExperience}`
      : "",
    data.whyGoalMatters
      ? `Why this goal matters: ${data.whyGoalMatters}`
      : "",
  ];

  return `
Create a personalized learning path for this learner.

Career goal: ${data.targetRole}
Current level: ${data.currentLevel}
Background: ${data.background}
Available time: ${weeklyHours} hours per week
Target timeframe: ${data.desiredTimeframe}
Learning preference: ${data.learningPreference || "Mixed"}
${optionalFields.filter(Boolean).join("\n")}

Apply these instructions to BOTH the steps and their resources:

Current level:
${levelGuidance[data.currentLevel] || "Match the depth of every step and resource to the learner's stated level and experience."}

Learning preference:
${preferenceGuidance[data.learningPreference || "Mixed"]}

Weekly time:
${paceGuidance}

Target timeframe:
- For 2 months, focus on the most important skills and avoid an overly broad path or long courses that cannot fit.
- For 4 months, include foundations where needed and enough time for meaningful practice.
- For 6 months, allow a more complete progression with practice and deeper work.
- For Flexible, use a sensible progression without forcing it into a fixed deadline.
- Apply the learner's selected timeframe (${data.desiredTimeframe}), not every option above.
- Make the combined estimated times realistic for ${weeklyHours} hours per week and the selected timeframe.

Path requirements:
- If the career goal is not an actual role, return an error.
- Generate 3 to 10 ordered steps relevant to the target role.
- Give each step one specific learning outcome.
- Use the background, existing skills, and experience to avoid teaching things the learner already knows.
- Explain why each step matters for the target role.
- Adjust the depth of ALL steps to the learner's current level.

Resource requirements:
- Aim for 3 to 5 distinct candidate resources per step when suitable ones are known. Never return more than 5 for a step.
- Choose each resource for this step's specific skill, the learner's current level, weekly time, timeframe, and learning preference.
- For a Beginner, a resource must teach the skill rather than only show examples or provide a tool.
- For an Intermediate learner, prefer material that demonstrates application and practice.
- For an Advanced learner, prefer substantial material that covers decisions, techniques, or deeper implementation.
- Link directly to a specific lesson, course, article, video, or documentation section. Do not use homepages, general blog indexes, search pages, or inspiration galleries.
- A resource type must be exactly "course", "article", "video", or "documentation". Use "course" only for a structured sequence of lessons.
- The title must accurately describe the content at the URL.
- Recommend videos only if they teach the step's skill; never include music or unrelated entertainment.
- Include both free and paid resources when suitable ones are known. Set isFree to false when accessing the recommended content requires payment, even if a preview is free.
- Do not invent titles, URL slugs, or video IDs to fill the list. If fewer suitable resources are known, include only those.
- Do not include tools, games, or standalone exercises as learning resources.

Return ONLY a valid JSON object with:
- targetRole: string
- steps: an array of objects with position, title, description, whyItMatters, estimatedTime, and resources
- resources: an array of objects with title, type, url (direct HTTPS URL), and isFree (boolean)

Do not include Markdown or text outside the JSON.
`.trim();
}