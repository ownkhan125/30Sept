import { sendVerificationEmail } from "@/utils/sendEmail";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,


  pages: {
    signIn: '/auth/dashboard',
    signOut: "/"
  },
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      try {
        await sendVerificationEmail(email, "Verify your email", "Please verify your email!");
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