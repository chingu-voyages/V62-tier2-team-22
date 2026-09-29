import { PathInformation } from "@/schemas/learningPathSchemas";


export const STORAGE_KEY="storedPaths"
export const CURRENT_PATH_ID="currentPathId"

export async function storePath(path:PathInformation, deleteCurrent:boolean){
	if (typeof window == "undefined") return

	try{
		const pathStorage = localStorage.getItem(STORAGE_KEY)
		const pathDictionary:Record<string,PathInformation> =pathStorage?JSON.parse(pathStorage):{}

		if (deleteCurrent){
			const currentPathId=localStorage.getItem(CURRENT_PATH_ID)??""
			delete pathDictionary[currentPathId]
		}
		pathDictionary[path.id]=path

		localStorage.setItem(STORAGE_KEY,JSON.stringify(pathDictionary))
		localStorage.setItem(CURRENT_PATH_ID,path.id)

		

	}
	catch(e){
		console.error("failed to store path in local storage",e)
	}
}


export function retrieveCurrentPath(){
	if (typeof window =="undefined")
		return

	try{
		const storedId=localStorage.getItem(CURRENT_PATH_ID)
		if (storedId==null){
			return
		}		

		const paths=localStorage.getItem(STORAGE_KEY)
		const pathDictionary:Record<string,PathInformation> =paths?JSON.parse(paths):{}

		if (!Object.hasOwn(pathDictionary,storedId)){
			return
		}

		return pathDictionary[storedId]
	}
	catch{
		return
	}
}