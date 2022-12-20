import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/User";
import { compare } from "bcryptjs";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.githubClientId,
      clientSecret: process.env.githubSecretId,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch(error => { error: "Connection Faileld..." })
        const result = await Users.findOne({ email: credentials.email })
        if (!result) {
          throw new Error("No User Found with that email")
        }
        const checkPassword = await compare(credentials.password, result.password)
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Email or password doesn't match")
        }
        return result;
      }
    })
  ],
};

export default NextAuth(authOptions);
