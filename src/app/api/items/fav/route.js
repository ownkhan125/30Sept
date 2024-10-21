import { connect } from "http2"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/user.model";

export const GET = async () => {
    try {

       const session = await getServerSession(authOptions);
       if(!session) return 

       const userId = session.user?.userId;

        await connect();

        const user = await User.findById(userId).populate("favourites")
        

        
        
    } catch (error) {
        
    }
}