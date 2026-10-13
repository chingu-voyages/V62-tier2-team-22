import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const isDev=process.env.NODE_ENV==="development"
const skipAuth = isDev && process.env.SKIP_AUTH === "true";

export const {handlers, signIn,signOut,auth}=NextAuth({
	providers:skipAuth?[]:[
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
			if (skipAuth){
				return {
					...session,
					user:{
						id:"aihegaiej",
						name:"test",
						email:"anas@yahoo.bro",
						image:""
					},
					expires:new Date(Date.now()+24*60*60*1000).toISOString()
				}
			}
			if(session.user && token.userId){
				session.user.id= token.userId as string
			}
			return session
		}
	}
})