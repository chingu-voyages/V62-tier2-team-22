import { PathInformation, PathStep } from "@/schemas/learningPathSchemas";
import * as DatabaseUtils from '@/app/actions/path-actions'
import { learningPathRequest } from "@/schemas/formSchemas";


export function getStorageKey(userId?:string | null):string{
	if (!userId){
		return 'guest_learning_paths'
	}
	return `${userId}_learning_paths`
}

export function getCurrentPathKey(userId?:string | null):string{
	if (!userId){
		return 'guest_current_path'
	}
	return `${userId}_current_path`
}

export async function storeCurrentPath(path:PathInformation, userId:string|null, deletePrevious:boolean){
	if (typeof window == "undefined") return

	try{
		const storageKey=getStorageKey(userId)
		const currentPathKey=getCurrentPathKey(userId)
		const pathStorage = localStorage.getItem(storageKey)
		const pathDictionary:Record<string,PathInformation> =pathStorage?JSON.parse(pathStorage):{}

		if (deletePrevious){
			const currentPathId=localStorage.getItem(currentPathKey)
			if (currentPathId && pathDictionary[currentPathId])
				delete pathDictionary[currentPathId]
				await DatabaseUtils.deletePath(path.id).catch(console.error)
		}
		pathDictionary[path.id]=path

		localStorage.setItem(storageKey,JSON.stringify(pathDictionary))
		localStorage.setItem(currentPathKey,path.id)
	}
	catch(e){
		console.error("failed to store path",e)
	}
}


export async function retrieveCurrentPath(userId:string|null):Promise<PathInformation | null >{
	if (typeof window =="undefined")
		return null

	try{
		const storageKey=getStorageKey(userId)
		const currentPathKey=getCurrentPathKey(userId)
		let storedPaths:Record<string,PathInformation> ={}
		let currentPathId=localStorage.getItem(currentPathKey)
		if (currentPathId==null){
			if (!userId)
				return null

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
				localStorage.setItem(currentPathKey,currentPathId)
				
			localStorage.setItem(storageKey,JSON.stringify(storedPaths))

			return currentPathId? storedPaths[currentPathId] : null
		}		

		const paths=localStorage.getItem(storageKey)
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