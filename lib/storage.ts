import { PathInformation, PathStep } from "@/schemas/learningPathSchemas";
import * as DatabaseUtils from '@/app/actions/path-actions'
import { learningPathRequest } from "@/schemas/formSchemas";

export const STORAGE_KEY="storedPaths"
export const CURRENT_PATH_ID="currentPathId"

export async function storeCurrentPath(path:PathInformation, deletePrevious:boolean){
	if (typeof window == "undefined") return

	try{
		const pathStorage = localStorage.getItem(STORAGE_KEY)
		const pathDictionary:Record<string,PathInformation> =pathStorage?JSON.parse(pathStorage):{}

		if (deletePrevious){
			const currentPathId=localStorage.getItem(CURRENT_PATH_ID)
			if (currentPathId==null)
				return
			delete pathDictionary[currentPathId]
			await DatabaseUtils.deletePath(currentPathId)	
		}
		pathDictionary[path.id]=path

		localStorage.setItem(STORAGE_KEY,JSON.stringify(pathDictionary))
		localStorage.setItem(CURRENT_PATH_ID,path.id)

		await DatabaseUtils.createPath(path)
	}
	catch(e){
		console.error("failed to store path in local storage",e)
	}
}


export async function retrieveCurrentPath():Promise<PathInformation | null >{
	if (typeof window =="undefined")
		return null

	try{
		let storedPaths:Record<string,PathInformation> ={}
		let currentPathId:string | null = null
		currentPathId=localStorage.getItem(CURRENT_PATH_ID)
		if (currentPathId==null){
			const paths=await DatabaseUtils.retrieveAllPaths()

			if (paths.length==0)
				return null

			paths.forEach((path,_)=>{
				if (_==0){
					currentPathId=path.id
				}
				storedPaths[path.id]={
					id:path.id,
					createdAt:path.createdAt.toISOString(),
					formData:path.formData as unknown as learningPathRequest,
					steps:path.steps as unknown as PathStep[]
				}
			})

			if (currentPathId)
				localStorage.setItem(CURRENT_PATH_ID,currentPathId)
				
			localStorage.setItem(STORAGE_KEY,JSON.stringify(storedPaths))

			return currentPathId? storedPaths[currentPathId] : null
		}		

		const paths=localStorage.getItem(STORAGE_KEY)
		storedPaths=paths?JSON.parse(paths):{}

		if (!Object.hasOwn(storedPaths,currentPathId)){
			return null
		}

		return storedPaths[currentPathId]
	}
	catch (e){
		console.error('failed to retrieve paths.',e)
		return null
	}
}