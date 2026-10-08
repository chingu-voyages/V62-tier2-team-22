import { PathInformation, PathStep } from "@/schemas/learningPathSchemas";
import * as DatabaseUtils from '@/app/actions/path-actions'
import { learningPathRequest } from "@/schemas/formSchemas";


export function getStorageKey(userId?:string | null):string{
	if (!userId){
		return 'guest_learning_path'
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
		const currentPathKey=getCurrentPathKey(userId)
		if (userId==null){
			sessionStorage.setItem(currentPathKey,JSON.stringify(path))
			return
		}

		const storageKey=getStorageKey(userId)
		const pathStorage: string | null = localStorage.getItem(storageKey)
		const pathDictionary: Record<string, PathInformation> = pathStorage ? JSON.parse(pathStorage) : {}

		if (deletePrevious){
			const keys=Object.keys(pathDictionary)
			const oldestKey=keys.reduce((oldest,current)=>{
				const currentVal=pathDictionary[current]
				const oldestVal=pathDictionary[oldest]

				return new Date(currentVal.createdAt).getTime()<new Date(oldestVal.createdAt).getTime()
				? current
				: oldest 
			},keys[0])
			delete pathDictionary[oldestKey]
			await DatabaseUtils.deletePath(oldestKey).catch(console.error)
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
		const currentPathKey=getCurrentPathKey(userId)
		if (userId==null){
			// handle guest users
			const currentPath=sessionStorage.getItem(currentPathKey)
			const currentPathParsed= currentPath? JSON.parse(currentPath) : null
			return currentPathParsed
		}

		const storageKey=getStorageKey(userId)
		let storedPaths:Record<string,PathInformation> ={}
		let currentPathId=localStorage.getItem(currentPathKey)
		if (currentPathId==null){
			const paths=await DatabaseUtils.retrieveAllPaths()

			if (paths.length==0)
				return null

			paths.forEach((path,index)=>{
				if (index===0)
					currentPathId=path.id
				
				storedPaths[path.id]={
					id:path.id,
					completed:path.completed,
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
			const remainingIds=Object.keys(storedPaths)
			
			if (remainingIds.length>0){
				const fallbackId=remainingIds[remainingIds.length-1]
				localStorage.setItem(currentPathKey,fallbackId)
				return storedPaths[fallbackId]
			}
			else{
				localStorage.removeItem(currentPathKey)
				return null
			}
		}
		return storedPaths[currentPathId]
	}
	catch (e){
		console.error('failed to retrieve paths.',e)
		return null
	}
}