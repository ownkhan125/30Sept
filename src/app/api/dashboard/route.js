import { connectDB } from "@/connectDB/connectDB"
import { UserData } from "@/models/UserData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";



export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();
        console.log('data check... ', data);

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user not found', { status: 401 })
        }

        let user = await UserData.findOne({ _id: session.user?.userId })
        if (user) {

            user.items.push({ name: data.Value, privacy: data.select })
            await user.save();
        }
        else {
            user = new UserData({
                author: session.user.userId,
                items: [{ name: data.Value, privacy: data.select }],
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




