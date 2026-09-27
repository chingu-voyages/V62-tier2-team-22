import { GoogleGenAI } from "@google/genai";

const PRIMARY_MODEL = "gemini-3.7-flash";
const SECONDARY_MODEL = "gemini-3.6-flash"; 

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function queryAi(query: string): Promise<string> {
  const TOTAL_TIMEOUT_MS = 18000; 

  const fetchModel = async (model: string) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TOTAL_TIMEOUT_MS);

    try {
      const res = await ai.interactions.create(
        {
          model,
          input: query,
          generation_config: {
            thinking_level: "low",
       	  },
        },
        {
          signal: controller.signal,
          timeout_ms: TOTAL_TIMEOUT_MS,
		  maxRetries:0
        },
      );

      if (!res.output_text) {
        throw new Error(`${model} gave an empty response`);
      }

      return res.output_text;
    } catch (error: any) {
      const status = error?.status || error?.response?.status;
      if (status === 429 || status === 401 || status === 403) {
        console.warn(`[${model}] Direct failure with status ${status}. Skipping to fallback...`);
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  };

	try {
		return await fetchModel(PRIMARY_MODEL);
	} catch (primaryError: any) {
		console.warn(`Primary model (${PRIMARY_MODEL}) failed`,primaryError?.message || primaryError)

		try {
			return await fetchModel(SECONDARY_MODEL);
		} catch (fallbackError: any) {
			console.error(`Fallback model (${SECONDARY_MODEL}) failed`,fallbackError?.error || fallbackError)

			throw new Error('Our AI service is temporarily unavailable. Please try again in a few moments.');
		}
	}
}