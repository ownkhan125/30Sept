import { connectDB } from "@/connectDB/connectDB";
import { Items } from "@/models/item.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const response = await Items.find({
            privacy: "public",
        }).populate("author", "name email").sort({ createdAt: -1 });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};