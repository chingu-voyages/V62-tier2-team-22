import { z } from "zod";

export const careerProfileSchema = z.object({
  targetRole: z.string().min(1, "Target role is required"),
  currentLevel: z.string().min(1, "Current level is required"),
  background: z.string().optional(),
  skills: z.array(z.string()).default([]),
  relevantExperience: z.string().optional(),
  whyGoalMatters: z.string().optional(),
  availableTime: z.string().min(1, "Available time is required"),
  desiredTimeframe: z.string().min(1, "Desired timeframe is required"),
  learningPreference: z.string().optional(),
});

export type CareerProfileInput = z.infer<typeof careerProfileSchema>;