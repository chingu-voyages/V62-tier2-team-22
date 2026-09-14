'use client'

import {getSession, signIn,signOut,useSession} from "next-auth/react"

export function GoogleSignInButton(){
	return (
		<button
			onClick={()=>signIn("google")}
			//implement styles here
			>Sign in with Google</button>
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
			<div className="flex items-center gap-3">
				<GoogleSignInButton/>
			</div>
		)
	}
}