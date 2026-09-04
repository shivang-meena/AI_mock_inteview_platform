import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authoptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid email or password");
                }
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user) {
                        throw new Error("Invalid email or password");
                    }

                    if (!user.password) {
    throw new Error("This account uses Google/GitHub sign-in. Please continue with that instead.");
}

                    const ispasswordmatched = await bcrypt.compare(
                        credentials.password,
                        user.password || " "
                    );

                    if (ispasswordmatched) {
                        return user;
                    } else {
                        throw new Error("Invalid email or password");
                    }
                } catch (err) {
                    throw new Error(err instanceof Error ? err.message : "Auth failed");
                }
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
    async signIn({ user, account }) {
        // Find-or-create only needed for OAuth providers;
        // Credentials users already exist by the time authorize() succeeds
        if (account?.provider === "github" || account?.provider === "google") {
            if (!user.email) return false;

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {
                const newUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        emailVerified: new Date(), // Google/GitHub already verified it
                    },
                });
                user.id = newUser.id;
            } else {
                
                user.id = existingUser.id;
            }
        }
        return true;
    },
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            return token;
        }


/////////////////////////////

          if (token.id) {
            const dbUser = await prisma.user.findUnique({
                where: { id: token.id as string },
            });
            if (!dbUser) {
                return {}; // wipes token.id → session becomes invalid downstream
            }
        }

        return token;
//////////////////////////////////


    },
    async session({ session, token }) {

        if (!token?.id) {
            // No confirmed DB user → tell the client there's no real session
            return { ...session, user: undefined } as unknown as typeof session;
        }
        session.user.id = token.id as string;
        return session;

        // if (token) {
        //     session.user.id = token.id as string;
        // }
        // return session;
    },
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRETKEY,
};




// import CredentialsProvider  from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import prisma from "@/lib/prisma";
// import NextAuth from "next-auth";
// import { NextAuthOptions } from "next-auth";

// export const authoptions:NextAuthOptions ={
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                  if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid email or password");
//         }
//                 try {
//                     const user = await prisma.user.findUnique({
//                         where: {
//                             email: credentials.email,
//                         },
//                     });

//                     if (!user) {
//                         throw new Error("Invalid email or password ");
//                     } 
//                     console.log(user);

//                   const ispasswordmatched=await  bcrypt.compare(credentials.password,user.password||" ");
 
//                   if (ispasswordmatched) {
//                     return user;
//                   }else{
//                     throw new Error("Invalid email or password");
//                   }

//                 } catch (err) {
                    
//                       throw new Error(err instanceof Error ? err.message : "Auth failed")
//                 }
//             }
//         }),
       
//     ],
//     callbacks:{
//         async  jwt({token,user}){
//             if (user) {
//                 token.id=user.id?.toString();
//                 token.isVerified=user.isVerified;
//                 token.isAcceptingMessages=user.isAcceptingMessages;
//                 token.username=user.username;
//             }
//            return token;
//         },
//         async session({session,token}){
//             if (token) {
//                 session.user.id=token.id;
//                 session.user.isVerified=token.isVerified;
//                 session.user.isAcceptingMessages=token.isAcceptingMessages;
//                 session.user.username=token.username;
//             }
//           return session;
//         }
//     },
//     pages:{
//         signIn:"/sign-in"
//     },
//     session:{
//         strategy:"jwt"
//     },
//     secret:process.env.SECRETKEY
// };