'use client'

import {  SignInButtons} from "@/components/Authentication/AuthButton";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES:Record<string,string> = {
	AccessDenied: "Sign-in was canceled. You can try logging in again whenever you're ready.",
	OAuthCallbackError: "Could not complete sign-in with your provider. Please try again.",
	Configuration: "Something went wrong on our end. Please try again later.",
	Default: "An error occurred during sign-in. Please try again.",
}

export default function LoginPage(){
	const searchParams=useSearchParams()
	const errorKey=searchParams.get("error")

	const errorMessage=errorKey?(ERROR_MESSAGES[errorKey]??ERROR_MESSAGES.Default):null

	return (
		<div className="flex flex-col items-center gap-4 p-8">
			{errorMessage && (
				<div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
					{errorMessage}
				</div>
			)}
			<SignInButtons/>	
		</div>
	)
}