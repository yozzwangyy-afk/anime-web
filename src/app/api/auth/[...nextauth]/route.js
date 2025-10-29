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
          role: "user",
          username: profile.login, // Tambahkan username
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
          role: "user",
          emailVerified: new Date(), // Mark email as verified for OAuth
        };
      }
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
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
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.username = user.username;
        session.user.emailVerified = user.emailVerified;
      }
      return session;
    },
    
    async jwt({ token, user, account }) {
      // Persist OAuth access_token to token
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    
    async signIn({ user, account, profile }) {
      // Allow sign in without email verification for OAuth
      if (account?.provider === "google" || account?.provider === "github") {
        return true;
      }
      
      // You can add additional sign-in logic here
      // For example, restrict certain email domains
      return true;
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  events: {
    async createUser({ user }) {
      // Custom logic when a new user is created
      console.log(`🎉 New user created: ${user.email}`);
      
      // You can add welcome email logic here
      // await sendWelcomeEmail(user.email, user.name);
    },
    
    async linkAccount({ user, account, profile }) {
      console.log(`🔗 Account linked for user: ${user.email}`);
    },
    
    async signIn({ user, account, isNewUser }) {
      if (isNewUser) {
        console.log(`👋 New user signed in for the first time: ${user.email}`);
      } else {
        console.log(`✅ User signed in: ${user.email}`);
      }
    }
  },

  // Enhanced security options
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },

  // Better error handling
  logger: {
    error(code, metadata) {
      console.error(`🔴 NextAuth Error [${code}]:`, metadata);
    },
    warn(code) {
      console.warn(`🟡 NextAuth Warning [${code}]`);
    },
    debug(code, metadata) {
      console.log(`🔵 NextAuth Debug [${code}]:`, metadata);
    }
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
