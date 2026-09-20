export function generateSkillsPrompt(role:string):string{
	return `
		What are the most common and most necessary
		skills to becoming a ${role} ?

		for example if a user wants to become a front end developer,
		return only JSON in this format:
		{
			success: true,
			skills : [ "UI/UX design" , "React" , "Next.js" , "Typescript" ]		
		}
	
		- Return no more than 10 skills and no less than 3
		- keep the items in skills no more than 2 words
	`.trim()
}

/*
export function generateSkillsPrompt(role:string):string{
    return `
        What are the most common and most necessary
        skills to becoming a ${role} ?

        for example if a user wants to become a front end developer,
        return only JSON in this format:
        {
            success: true,
            skills : [ "UI/UX design" , "React" , "Next.js" , "Typescript" ]        
        }
You are an expert technical recruiter and industry skills analyst.

Analyze the following target job role carefully: "${role}"

Your task is to identify and return 6 to 10 core, highly-relevant technical skills and tools required specifically for a "${role}".

STRICT CONSTRAINTS:
1. Relevance: Every skill MUST be directly applicable to "${role}". Do NOT include generic skills or front-end/web development technologies unless the role explicitly demands them.
2. Example Rules:
   - If the role is "Flutter Developer", return skills like: Dart, Flutter, State Management, REST APIs, Git.
   - If the role is "Data Analyst", return skills like: Python, SQL, Power BI, Data Visualization, Excel.
3. Item Length: Keep each skill name concise (1 to 3 words maximum).
4. Output Format: Return ONLY a strict raw JSON object with NO markdown tags, NO code blocks, and NO additional text.

        - The skills MUST strictly depend on the input role "${role}". For example, if the role is a Data Scientist, return data skills; if it is a DevOps engineer, return cloud/CI-CD skills, etc.
        - Return no more than 10 skills and no less than 3
        - keep the items in skills no more than 2 words
    `.trim()
}
*/