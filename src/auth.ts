import NextAuth from "next-auth";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const config = {
  providers: [Google],
  callbacks: {
    async jwt({ token }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });
      if (!dbUser) {
        throw new Error("no user with email found");
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
