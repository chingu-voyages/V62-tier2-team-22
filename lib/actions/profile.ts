"use server";

import { prisma } from "@/lib/prisma";
import { careerProfileSchema, CareerProfileInput } from "@/lib/validations/profile";

export async function saveCareerProfile(data: CareerProfileInput) {
  const validated = careerProfileSchema.parse(data);

  const profile = await prisma.careerProfile.create({
    data: {
      targetRole: validated.targetRole,
      currentLevel: validated.currentLevel,
      background: validated.background,
      skills: validated.skills,
      relevantExperience: validated.relevantExperience,
      whyGoalMatters: validated.whyGoalMatters,
      availableTime: validated.availableTime,
      desiredTimeframe: validated.desiredTimeframe,
      learningPreference: validated.learningPreference,
    },
  });

  return profile;
}