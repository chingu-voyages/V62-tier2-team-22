import { NextResponse } from "next/server";
import { learningPathRequestSchemas } from "@/schemas/formSchemas";
import queryAi from "@/lib/ai/gemini";
import { buildLearningPathPrompt } from "@/lib/ai/learning-path";
import { learningPathResponseSchema } from "@/schemas/learningPathSchemas";
import { isResourceAvailable } from "@/lib/resources";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = learningPathRequestSchemas.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "An error occured while parsing the form." },
        { status: 400 }
      );
    }

    const prompt = buildLearningPathPrompt(parsed.data);
    let aiResponse: string;

    try {
      aiResponse = await queryAi(prompt);
    } catch (e) {
      const errorMessage =
        e instanceof Error
          ? e.message
          : "AI service unavailable. Please try again later.";

      return NextResponse.json(
        { error: errorMessage },
        { status: 503 }
      );
    }

    let parsedResponse: unknown;

    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      return NextResponse.json(
        { error: "An error occured while generating the path." },
        { status: 502 }
      );
    }

    const resResult =
      learningPathResponseSchema.safeParse(parsedResponse);

    if (!resResult.success) {
      return NextResponse.json(
        {
          error:
            "An error occured while generating the path, ensure your target role is valid.",
        },
        { status: 400 }
      );
    }

    const checkedSteps = await Promise.all(
      resResult.data.steps.map(async (step) => {
        const checkedResources = await Promise.all(
          step.resources.map(async (resource) => {
            const available = await isResourceAvailable(resource.url);
            return available ? resource : null;
          })
        );

        return {
          ...step,
          resources: checkedResources
  .filter((resource) => resource !== null)
  .filter((resource, index, resources) => {
    resources.findIndex((r) => r?.url === resource?.url) === index;
  })
  .slice(0, 3),
        };
      })
    );

    return NextResponse.json({
      message: "Learning path generated successfully",
      data: {
        ...resResult.data,
        steps: checkedSteps,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}