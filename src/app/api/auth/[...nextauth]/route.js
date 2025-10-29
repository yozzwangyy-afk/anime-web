import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/libs/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user", // Default role
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user", // Default role
        };
      }
    }),
  ],

  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },

  callbacks: {
    async session({ session, user }) {
      // Send properties to the client
      session.user.id = user.id;
      session.user.role = user.role;
      
      return session;
    },
    
    async signIn({ user, account, profile }) {
      // Allow sign in without email verification for OAuth
      if (account?.provider === "google" || account?.provider === "github") {
        return true;
      }
      return true;
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to home page after sign in
      if (url.startsWith(baseUrl)) return url;
      // Allow relative callback URLs
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    }
  },

  events: {
    async createUser({ user }) {
      // Optional: Add custom logic when a new user is created
      console.log(`New user created: ${user.email}`);
    },
    
    async signIn({ user, account, isNewUser }) {
      if (isNewUser) {
        console.log(`New user signed in for the first time: ${user.email}`);
      }
    }
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
