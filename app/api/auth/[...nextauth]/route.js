import { User } from "@/app/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  // adapter: MongoDBAdapter(clientPromise),
  // providers: [
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   }),
  //   CredentialsProvider({
  //     name: "Credentials",
  //     id: "credentials",
  //     credentials: {
  //       email: {
  //         label: "Email",
  //         type: "email",
  //       },
  //       password: {
  //         label: "Password",
  //         type: "password",
  //       },
  //     },
  //     async authorize(credentials, req) {
  //       const email = credentials?.email;
  //       const password = credentials?.password;
  //       console.log("cre", credentials);
  //       mongoose.connect(process.env.MONGO_URL);
  //       const user = await User.findOne({ email });
  //       const passwordOk = user && bcrypt.compareSync(password, user.password);

  //       if (passwordOk) {
  //         console.log("user", user);
  //         return user;
  //       }

  //       return null;
  //     },

  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
