import {z} from "zod";

export const learningStepsSchema = z.object({
    position: z.number().int().positive(),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    whyItMatters: z.string().trim().min(1),
    estimatedTime: z.string().trim().min(1),
})

export const learningPathResponseSchema = z.object({
    targetRole: z.string().trim().min(1),
    steps: z.array(learningStepsSchema).min(2),
})


export type LearningStep = z.infer<typeof learningStepsSchema>;

export type LearningPathResponse = z.infer<typeof learningPathResponseSchema>;
