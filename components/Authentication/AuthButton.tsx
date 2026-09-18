'use client'

import Link from "next/link"
import {getSession, signIn,signOut,useSession} from "next-auth/react"

export function SignInButtons(){
	return (
		<div>
			<button
				onClick={()=>signIn("google",{redirectTo:"/"})}
				//implement styles here
				>Sign in with Google</button>
			<button
				onClick={()=>signIn("github",{redirectTo:"/"})}
				//implement styles here
				>Sign in with Github</button>
		</div>
	)
}


export function SignOutButton(){
	return (
		<button onClick={()=>signOut()}
	>Sign out</button>
	)
}

export function AuthStatus(){
	const {data:session,status} =useSession()
	
	if (status=='loading'){
		return (
			<span>Loading...</span>
		)
	}

	if (session?.user){
		return(
			<div className="flex items-center gap-3">
				<span>{session.user.name}</span>
				<SignOutButton/>
			</div>
		)
	}
	else{
		return (
			<Link href="/login">Login</Link>
		)
	}
}