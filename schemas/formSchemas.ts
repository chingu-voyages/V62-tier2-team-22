import {z} from "zod";


// User profile Schema 
export const learningPathRequestSchemas = z.object({
    targetRole: z.string().trim().min(1),
    currentLevel: z.string().trim().min(1),
    background: z.string().trim().min(1),
    skills: z.array(z.string()).min(1),
    availableTime: z.number().positive(),
    desiredTimeframe: z.string().trim().min(1),
    relevantExperience: z.string().optional(),
    whyGoalMatters: z.string().optional(),
    learningPreference: z.string().optional()


})




export type learningPathRequest = z.infer<typeof learningPathRequestSchemas>;



