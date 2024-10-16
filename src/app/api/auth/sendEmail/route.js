import { connectDB } from '@/connectDB/connectDB';
import { User } from "@/models/user.model";
import { sendVerificationEmail } from '@/utils/sendEmail';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
  try {
    await connectDB();

    const { email } = await req.json();
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json('User Not Register', { status: 404 });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    const resetLink = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;

    await sendVerificationEmail(email, 'verify', ` <a  href=${resetLink}>Reset Button</a>`);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
};
