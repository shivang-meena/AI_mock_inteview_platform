// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// // import { auth } from "@/auth";
// import  {authoptions } from "@/app/api/auth/[...nextauth]/options";
 
// export async function GET() {
//   const session = await authoptions();
 
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
 
//   const token = jwt.sign(
//     { userId: session.user.id },
//     process.env.BACKEND_JWT_SECRET!,
//     { expiresIn: "7d" }
//   );
 
//   return NextResponse.json({ token });
// }


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authoptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  console.log(process.env.BACKEND_JWT_SECRET!);

  const token = jwt.sign(
    { userId: session.user.id },
    process.env.API_JWT_SECRET!,
    { expiresIn: "7d" }
  );
  console.log(session.user.id );


  return NextResponse.json({ token });
}