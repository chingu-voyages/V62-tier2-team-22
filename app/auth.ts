import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";


export const {handlers, signIn,signOut,auth}=NextAuth({
	providers:[
		Google({
			clientId:process.env.AUTH_GOOGLE_ID!,
			clientSecret:process.env.AUTH_GOOGLE_SECRET!,
		}),
		GitHub({
			clientId:process.env.AUTH_GITHUB_ID!,
			clientSecret:process.env.AUTH_GITHUB_SECRET!
		})
	],
	pages:{
		signIn:"/login",
		error:"/login"
	},
	session:{
		strategy:'jwt'
	},
	callbacks:{
		async jwt({token,account,profile}){
			if (profile){
				const providerUserId=profile.sub || (profile.id ? String(profile.id) : null)
				if(providerUserId){
					token.userId=providerUserId
				}
			}	

			if (!token.userId && token.sub)
				token.userId=token.sub

			return token
		},
		async session({session,token}){
			if(session.user && token.userId){
				session.user.id= token.userId as string
			}
			return session
		}
	}
})