import { connectDB } from '@/connectDB/connectDB';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
    try {
        connectDB();
        const responseData = await req.json();
        console.log(responseData);
        const { token, confirmpassword } = responseData;


        let decode

        try {
            decode = await jwt.verify(token, 'secretKey');
        } catch (error) {
            if (error.message === "jwt expired") {
                return NextResponse.json({ message: 'Jwt expired' }, { status: 404 });
            };
            return NextResponse.json({ message: 'invalid token' }, { status: 404 });
        };


        const user = await User.findById(decode.userId).exec();
        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 400 });
        };
        user.password = confirmpassword;
        await user.save();

        return NextResponse.json({ message: 'password reset successfully' }, { status: 200 });


        // const decoded = jwt.verify(token, 'secretKey');
        // console.log('token ', { decoded, confirmpasword });
        // const user = await User.findOne({ email: email });

        // console.log('user:', user.email);

        // if (!user) {
        //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
        // }

        // user.password = newPassword;
        // await user.save();

    } catch (error) {
        console.log('error: ', error.message);
        return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
    }
};
