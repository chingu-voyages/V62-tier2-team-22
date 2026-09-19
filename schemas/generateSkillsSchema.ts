import { z } from "zod"

export const generatedSkillsResponse = z.object({
	success:z.boolean(),
	skills:z.array(z.string().trim().min(1)).min(3)
})

export type GeneratedSkills = z.infer<typeof generatedSkillsResponse>