import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Items } from "@/models/Items";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        let responseData;

        const fetchType = req.nextUrl.searchParams.get("type") || "public";

        if (fetchType === "private") {
            const session = await getServerSession(authOptions);
            if (!session) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            const userId = session.user.userId;

            // Find all documents for this user where items have privacy set to 'private'
            responseData = await Items.find(
                {
                    "items.privacy": "private"  // Matches all items with privacy set to 'private'
                },
            );
        }

        if (fetchType === "public") {
            // Find all documents where at least one item has privacy set to 'public'
            responseData = await Items.find(
                {
                    "items.privacy": "public" // Matches all items with privacy set to 'public'
                },
            );
        }

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
