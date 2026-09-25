import {z} from "zod";
import { learningPathRequest } from "./formSchemas";

export const learningStepsSchema = z.object({
    position: z.number().int().positive(),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    whyItMatters: z.string().trim().min(1),
    estimatedTime: z.string().trim().min(1),
})

export const learningPathResponseSchema = z.object({
    targetRole: z.string().trim().min(1),
    steps: z.array(learningStepsSchema).min(3).max(10),
})


export type LearningStep = z.infer<typeof learningStepsSchema>;

export type LearningPathResponse = z.infer<typeof learningPathResponseSchema>;

export interface PathStep extends LearningStep{
	completed?:boolean
}

export interface PathInformation {
	id:string,
	createdAt:string,
	formData:learningPathRequest,
	steps:PathStep[]
}