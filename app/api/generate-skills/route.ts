import queryAi from "@/lib/ai/gemini";
import { generateSkillsPrompt } from "@/lib/ai/generate-skills";
import { generatedSkillsResponse } from "@/schemas/generateSkillsSchema";
import { NextResponse } from "next/server";




export async function POST(request:Request){
	const {role} = await request.json()
	
	const query = generateSkillsPrompt(role)
	const response= await queryAi(query)

	let generatedSkills:unknown
	try{
		generatedSkills=JSON.parse(response)
	}
	catch(error){
		return NextResponse.json(
			{error:"invalid json response from ai"},
			{status:502}
		)
	}

	const parsedResponse=generatedSkillsResponse.safeParse(generatedSkills)
	if (!parsedResponse.success){
		return NextResponse.json(
			{error:"invalid response format from ai"},
			{status:502}
		)
	}

	return NextResponse.json({
		message:"skills generated successfully",
		data:parsedResponse.data.skills
	})
}