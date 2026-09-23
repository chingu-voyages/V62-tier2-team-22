import { PathInformation } from "@/schemas/learningPathSchemas";


const STORAGE_KEY="storedPaths"

export async function storePath(path:PathInformation){
	if (typeof window == "undefined") return

	try{
		const pathStorage = localStorage.getItem(STORAGE_KEY)

		const pathArray:PathInformation[]=pathStorage?JSON.parse(pathStorage):[]
		pathArray.push(path)

		localStorage.setItem(STORAGE_KEY,JSON.stringify(pathArray))
	
		console.log("stored!!")
	}
	catch(e){
		console.error("failed to store path in local storage",e)
	}
}

