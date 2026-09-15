import {NextResponse} from "next/server";
import {learningPathRequestSchemas} from "@/schemas/formSchemas";
import queryAi from "@/lib/gemini";
import { buildLearningPathPrompt , learningPathResponseSchema} from "@/lib/learning-path";


export async function POST(request: Request) {
    const body = await request.json();
    const result = learningPathRequestSchemas.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            { error: "Invalid career information" },
            { status: 400 }
        );
    }
        const prompt = buildLearningPathPrompt(result.data);
        const aiResponse = await queryAi(prompt);

        let parsedResponse: unknown;

        try {
            parsedResponse = JSON.parse(aiResponse);
        }catch  {
            return NextResponse.json(
                {error: "Invalid JSON response from AI"},
                { status: 502 }
            )
        }

        const resResult = learningPathResponseSchema.safeParse(parsedResponse);
       
        if (!resResult.success) {
            return NextResponse.json(
                {error: "Invalid response format from AI"},
                { status: 502 }
            )
        }

        return NextResponse.json({
            message: "Learning path generated successfully",
            data: resResult.data,
        })

}
