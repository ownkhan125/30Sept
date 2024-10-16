import { connectDB } from "@/connectDB/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Items } from "@/models/item.model";
import { User } from "@/models/user.model";

export const GET = async (req) => {
    try {
        const type = req.nextUrl.searchParams.get("type") || "public";

        let response;
        await connectDB();

        if (type === "public") {
            response = await Items.find({
                privacy: "public"
            }).populate("author", "name email")
        };

        if (type === "private") {

            const session = await getServerSession(authOptions);
            if (!session) {
                return NextResponse.json('user unAuthorized', { status: 401 })
            };

            const userId = session?.user?.userId;

            response = await Items.find({
                privacy: "private",
                author: userId
            }).populate("author", "name email");
        };


        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


export const POST = async (req) => {
    try {

        const responsedata = await req.json();
        if (!responsedata) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        };

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        };

        await connectDB();

        const user = await User.findById(session?.user?.userId);
        if (!user) {
            return NextResponse.json('user not found', { status: 404 })
        }


        const newItem = new Items({
            author: user._id,
            ...responsedata
        });

        await newItem.save();


    } catch (error) {
        console.log(error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}