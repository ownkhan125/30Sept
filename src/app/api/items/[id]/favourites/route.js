import { connectDB } from "@/connectDB/connectDB"
import { Items } from "@/models/item.model";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@/models/user.model";

export const POST = async (req , context) => {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        };

        const userId = session.user.userId;
        const user = await User.findById(userId);
        if(!user) return 

        const { params : {id : itemId} } = context;
        if(!itemId) return 


        const response = await Items.findOne({ _id: itemId })
        if(!response) return 

        if(user.favourites && user.favourites?.length > 0 && user.favourites?.includes(userId)){
            return NextResponse.json( `user ${userId} already add in favourites`, { status: 404 })
        }

        user.favourites.push(userId);
        await response.save();

        console.log('response check', response);
        return NextResponse.json('successful', { status: 200 })
    } catch (error) {
        return NextResponse.json(error?.message, { status: 500 })
    }
}