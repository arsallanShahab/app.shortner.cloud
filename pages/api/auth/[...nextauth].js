import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        const isMatch = await compare(credentials.password, user.password);
        console.log(user, isMatch);
        if (user && isMatch) {
          console.log(`isMatch: ${isMatch}`);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      const sessionUser = await clientPromise.then((client) =>
        client.db().collection("users").findOne({ email: session.user.email })
      );

      session.user.id = sessionUser._id.toString();
      return session;
    },
  },
  page: "/user/login",
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
