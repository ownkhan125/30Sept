import { connectDB } from "@/connectDB/connectDB"
import { UserData } from "@/models/UserData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";



export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();
        const session = await getServerSession(authOptions);
        let user = await UserData.findOne({ _id: session.user.userId })
        if (user) {
            user.items.push({ name: data })
            await user.save();
        }
        else {
            user = new UserData({
                _id: session.user.userId,
                email: session.user.email,
                items: [{ name: data }]
            })
            await user.save();
        }
        // const users = await UserData.find();
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json(error?.message, { status: 500 })
    }
}

export const GET = async () => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        const user = await UserData.findOne({ _id: session.user.userId })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json(error?.message, { status: 500 })
    }
}




