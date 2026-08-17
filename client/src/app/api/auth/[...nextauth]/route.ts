import NextAuth from "next-auth";
import { authoptions } from "./options";

const nexthandler=NextAuth(authoptions);

export {nexthandler as GET,nexthandler as POST}
// export const { GET, POST } = handlers;