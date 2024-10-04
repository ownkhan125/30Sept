import { sendVerificationEmail } from '@/utils/sendEmail';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { to, subject, text, html } = await req.json();

    await sendVerificationEmail(to, subject, text, html);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error:', error); 
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
};
