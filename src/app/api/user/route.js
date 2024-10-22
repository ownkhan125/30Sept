import { connectDB } from "@/connectDB/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/user.model";
import { Items } from "@/models/item.model";

export const DELETE = async (req) => {
    try {
        await connectDB();

        // Get session
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const userId = session.user?.userId;

        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Find items authored by the user that are not deleted
        const items = await Items.find({
            author: userId,
            deletedAt: null
        }).select("_id");

        if (items.length > 0) {
            // Soft delete items (set deletedAt timestamp)
            await Items.updateMany({
                _id: { $in: items }
            }, {
                $set: {
                    deletedAt: Date.now()
                }
            });
        }

        // Delete the user
        await user.deleteOne();

        return new Response(JSON.stringify({ message: "User and associated items deleted successfully" }), { status: 200 });

    } catch (error) {
        console.error("Error deleting user:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
};
