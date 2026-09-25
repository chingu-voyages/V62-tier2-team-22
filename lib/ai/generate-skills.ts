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

