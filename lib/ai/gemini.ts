import { GoogleGenAI } from "@google/genai";



function withTimeout<T>(promise:Promise<T>,ms:number=10000):Promise<T>{
	const timeout=new Promise<never>((_,reject)=>{
		setTimeout(()=>reject(new Error(`Request timed out after ${ms}ms`)))
	})
	return Promise.race([promise,timeout])
}

export default async function queryAi(query:string):Promise<string>{
	const timeOut=10000
	const ai =new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	})

	try{
		const interaction = await withTimeout (
			ai.interactions.create({
			model: "gemini-3.6-flash",
			input: query
			}),
			timeOut
		)
		if (!interaction.output_text) {
			throw new Error("primary model returned a faulty response")
		}
		return interaction.output_text;
	}
	catch {
		const interaction=await withTimeout(
			ai.interactions.create({
				model:"gemini-3.1-flash-lite",
				input:query
			}),
			timeOut
		)

		return interaction.output_text?? ""
	}
}