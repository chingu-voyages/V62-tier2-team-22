import { GoogleGenAI } from "@google/genai";


export default async function queryAi(query:string):Promise<string>{
	const ai =new GoogleGenAI({})


	const interaction = await ai.interactions.create({
		model:"gemini-3.8-flash",
		input:query
	})
	if (interaction.output_text==undefined){
		return "Error"
	}
	return interaction.output_text;
}