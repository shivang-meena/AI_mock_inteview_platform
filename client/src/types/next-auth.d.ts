import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string;
    }
    interface Session {
        user: {
            id?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
    }
}

// import "next-auth"
// import { DefaultSession } from "next-auth"

// declare module "next-auth" {
//     interface User {
//         id?: string,
//         isVerified?: string,
//         isAcceptingMessages?: string,
//         username?: string
//     }
//     interface Session {
//         user: {
//             id?: string,
//             isVerified?: string,
//             isAcceptingMessages?: string,
//             username?: string
//         }& DefaultSession ["user"]
//     }
// }

// declare module "next-auth/jwt"{
//     interface JWT{
//           id?: string,
//             isVerified?: string,
//             isAcceptingMessages?: string,
//             username?: string
//     }
// }