import { connectDB } from "@/connectDB/connectDB"
import { UserData } from "@/models/UserData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"



export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();
        const session = await getServerSession();
        let user = await UserData.findOne({ email: session.user.email })
        if (user) {
            user.items.push({ name: data })
            await user.save();
        }
        else {
            user = new UserData({
                email: session.user.email,
                items: [{ name: data }]
            })
            await user.save();
        }
        // const users = await UserData.find();
        return NextResponse.json('successfull', { status: 200 })
    } catch (error) {
        return NextResponse.json(error?.message, { status: 500 })
    }
}


export const GET = async () => {
    try {
        await connectDB();
        const users = await UserData.find()
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json(error?.message, { status: 500 })
    }
}