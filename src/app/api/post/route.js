import { connectDB } from "@/connectDB/connectDB";
import { Items } from "@/models/item.model";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req) => {
    try {
        const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
        const limit = 10;

        await connectDB();

        const totalPosts = await Items.countDocuments({ privacy: "public" });
        const totalPages = Math.ceil(totalPosts / limit);

        const response = await Items.find({ privacy: "public" })
            .populate("author", "name email")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();


        return NextResponse.json({
            posts: response,
            currentPage: page,
            totalPages: totalPages,
            hasMore: page < totalPages
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


export const POST = async (req) => {
    try {
        await connectDB();
        const { id } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        }
        const response = await Items.findOne({ _id: id })

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}