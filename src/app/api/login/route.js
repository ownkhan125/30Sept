import { connectDB } from "@/connectDB/connectDB"
import { User } from "@/models/User";
import { NextResponse } from "next/server"


export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();
        const user = await User.findOne({ email: data.email })
        if (user) {
            if (user.password === data.password) {
                return NextResponse.json(user, { status: 200 })
            }
            else {
                return NextResponse.json('incorrect password', { status: 401 })
            }
        }
        else if (!user) {
            return NextResponse.json('user not found', { status: 404 })
        }
    } catch (error) {
        return NextResponse.json('login Route', error.message, { status: 500 })
    }
}