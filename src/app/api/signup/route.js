import { connectDB } from "@/connectDB/connectDB";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();

        const user = new User({
            name: data.name,
            email: data.email,
            password: data.password
        })
        await user.save();
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}