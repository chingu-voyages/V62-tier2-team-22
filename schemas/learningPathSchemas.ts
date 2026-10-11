import {z} from "zod";
import { learningPathRequest } from "./formSchemas";


export const learningResourceSchema = z.object({
    title: z.string().trim().min(1),
    type: z.enum(["course", "article", "video", "documentation"]),
    url: z.string().url().refine(
        (url) => url.startsWith("https://"),{
            message: "Resource link must use HTTPS protocol"
        }
    ),
    isFree: z.boolean(),
})

export const learningStepsSchema = z.object({
    position: z.number().int().positive(),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    whyItMatters: z.string().trim().min(1),
    estimatedTime: z.string().trim().min(1),
    resources: z.array(learningResourceSchema).max(5).default([]),
})

export const learningPathResponseSchema = z.object({
    targetRole: z.string().trim().min(1),
    steps: z.array(learningStepsSchema).min(3).max(10),
})


export type LearningStep = z.infer<typeof learningStepsSchema>;
export type LearningPathResponse = z.infer<typeof learningPathResponseSchema>;
export type LearningResource = z.infer<typeof learningResourceSchema>;

export interface PathStep extends LearningStep{
	completed?:boolean
}

export interface PathInformation {
	id:string,
	createdAt:string,
	completed:boolean,
	formData:learningPathRequest,
	steps:PathStep[]
}