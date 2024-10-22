import { connectDB } from "@/connectDB/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { User } from "@/models/user.model";



export const GET = async () => {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        }
        const userId = session.user?.userId;
        const user = await User.findById(userId).populate('favourites')
        if (!user) {
            return NextResponse.json('User not found', { status: 404 });
        }


        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 })
    }
}