import { NextResponse } from "next/server";
// import {prisma} from "@prisma/client"
import prisma from "@/lib/prisma";  
import bcrypt from "bcryptjs";

export async function POST(request:Request) {
    try { 

        const body=await request.json();
        
    if (!body.email || !body.password ||!body.name) {
      return NextResponse.json(
        {
          success: false,
          message: "Email name and password  are required",
        },
        { status: 400 }
      );
    }


 const existingUser = await prisma.user.findUnique({
      where: {
        email:body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

  const hashedpass=await bcrypt.hash(body.password,10);
  console.log(body.email);
const newuser=await prisma.user.create({
    data:{
        name:body.name,
        email:body.email,
        password:hashedpass
    }
});


const {password:_,...userwithoutpass}=newuser
return NextResponse.json({succes:true,messege:"User regitered Succesfully",newuser:userwithoutpass},{status:201});
    } catch (err) {
    
         console.error(err); // full error object + stack, printed in your terminal
  return NextResponse.json(
    {
    succes:false,
      messege: "have some error on server side",
      err: err instanceof Error ? err.message : String(err),
    },
    { status: 500 }
  );

    }
}