import { PathInformation } from "@/schemas/learningPathSchemas";


export const STORAGE_KEY="storedPaths"
export const CURRENT_INDEX="currentIndex"

export function storePath(path:PathInformation){
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


export function retrieveCurrentPath(){
	if (typeof window =="undefined")
		return

	try{
		const paths=localStorage.getItem(STORAGE_KEY)
		const pathArray:PathInformation[]=paths?JSON.parse(paths):[]

		if (pathArray.length==0){
			return
		}

		const index=localStorage.getItem(CURRENT_INDEX)
		const currentIndex:number=index?JSON.parse(index):0

		return pathArray[currentIndex]
	}
	catch{
		return
	}
}