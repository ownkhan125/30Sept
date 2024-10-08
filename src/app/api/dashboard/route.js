import { connectDB } from "@/connectDB/connectDB"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"



export const POST = async (req) => {
    try {
        await connectDB();
        const session = await getServerSession();

        console.log(session.user);


        return NextResponse.json('user', { status: 200 })   
    } catch (error) {
        return NextResponse.json('dashboard route:', error.message, { status: 500 })
    }
}