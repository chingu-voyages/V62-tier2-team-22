'use server'

import { auth } from "@/lib/auth"
import { Prisma } from "@/generated/prisma/browser"
import { prisma } from "@/lib/prisma"
import { PathInformation } from "@/schemas/learningPathSchemas"

export async function createPath(path:PathInformation){
	const session = await auth()

	if (!session?.user?.id){
		console.log("ABORTED: No session.user.id found!");
		return null
	}

	await prisma.learningPath.create({
		data:{
			id:path.id,
			createdAt:path.createdAt,
			userId:session.user.id,
			formData:path.formData,
			steps:path.steps as unknown as Prisma.InputJsonValue
		}
	})
	console.log("Database write confirmed! Created ID:", path.id);
}

export async function retrievePath(pathId:string){
	const session = await auth()

	if (!session?.user?.id){
		return null
	}

	const path = await prisma.learningPath.findFirst({
		where:{
			id:pathId,
			userId:session.user.id
		}
	})

	return path
}

export async function retrieveAllPaths(){
	const session = await auth()

	if (!session?.user?.id){
		return []
	}

	const paths = await prisma.learningPath.findMany({
		where:{
			userId:session.user.id
		}
	})
	return paths
}
export async function updatePath(path:PathInformation){
	const session = await auth()

	if (!session?.user?.id){
		return
	}

	await prisma.learningPath.upsert({
		where:{
			id:path.id,
			userId:session.user.id
		},
		update:{
			steps:path.steps as unknown as Prisma.InputJsonObject
		},
		create:{
			id:path.id,
			userId:session.user.id,
			createdAt:path.createdAt,
			formData:path.formData,
			steps:path.steps as unknown as Prisma.InputJsonObject
		}
	})
}

export async function deletePath(pathId:string){
	const session = await auth()

	if (!session?.user?.id){
		return
	}

	await prisma.learningPath.delete({
		where:{
			id:pathId,
			userId:session.user.id
		}
	})
}