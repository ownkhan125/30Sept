import { connectDB } from "@/connectDB/connectDB";
import { User } from "@/models/User";
import { sendVerificationEmail } from "@/utils/sendEmail";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'Verify',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials, req) {
        try {
          await connectDB();
          const { email, password } = credentials;
          const user = await User.findOne({ email: email })
          if (user) {
            if (password === user.password) {
              return user;
            } else {
              throw new Error('Incorrect password', {status: 401});
            }
          }

        } catch (error) {
          console.log("catch error", error?.message);
          return null
        }
      }
    }),

    // start Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,


  pages: {
    signIn: '/dashboard',
    signOut: "/"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          await connectDB();

          const user = await new User({
            username: profile.name,
            email: profile.email,
            password: profile.at_hash
          })

          await user.save();

        } catch (error) {
          console.log(error.message);
        }
      }
      const { email } = user;
      try {
        await sendVerificationEmail(email, "own khan", "verify",
          `<div class="font-sans text-gray-800 max-w-lg mx-auto p-5 border border-gray-300 rounded-lg">
            <table role="presentation" class="w-full border-spacing-0">
        <tr>
            <td class="bg-blue-600 p-5 text-center rounded-t-lg">
                <h1 class="text-white m-0">Welcome to Our Service!</h1>
            </td>
        </tr>

        <tr>
            <td class="p-5 bg-white">
                <p>Dear [User],</p>
                <p>We are excited to have you on board. Please verify your email address by clicking the button below.</p>

                <div class="text-center my-5">
                    <a href="https://your-verification-link.com" class="bg-green-600 text-white py-3 px-5 rounded-lg inline-block">Verify Email</a>
                </div>

                <p>If you did not sign up for this service, you can safely ignore this email.</p>

                <img src="https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg" alt="Thank You" class="w-full max-w-md rounded-lg block mx-auto my-5" />

                <p>Best regards,<br>Your Company Team</p>
            </td>
        </tr>

        <tr>
            <td class="bg-gray-100 p-5 text-center rounded-b-lg text-gray-500">
                <p class="m-0 text-xs">You received this email because you signed up for our service. If you wish to unsubscribe, <a href="#" class="text-blue-600">click here</a>.</p>
                <p class="m-0 text-xs">&copy; 2024 Your Company. All rights reserved.</p>
            </td>
        </tr>
       </table>
          </div>`);
        return true;
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
};



export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);