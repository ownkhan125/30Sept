import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/connectDB/connectDB";
import { Items } from "@/models/item.model";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const POST = async (req, context) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        };

        const userId = session.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(`Not unAuthorized`, { status: 401 })
        }
        const { params: { id: itemId } } = context;
        if (!itemId) {
            return NextResponse.json(`Not unAuthorized`, { status: 401 })
        }


        const response = await Items.findOne({ _id: itemId })
        if (!response) {
            return NextResponse.json(`Not unAuthorized`, { status: 401 })
        }

        if (user.favourites.includes(response._id)) {
            await User.updateOne(
                { _id: user._id },
                { $pull: { favourites: response._id } }
            );
        }
        user.favourites.push(response);
        await user.save();

        return NextResponse.json('successful', { status: 200 })
    } catch (error) {
        return NextResponse.json(error?.message, { status: 500 })
    }
}

