import { AuthCredentialsValidator } from "@/lib/validators/AccountCredentialsValidator";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { connectToDB } from "@/lib/mongodb";
import { sendVerificationEmail } from "@/lib/email-verification/verify";
import jwt, { JwtPayload } from "jsonwebtoken";
import z from "zod";
import { cookies } from 'next/headers';
import { TRPCError } from "@trpc/server";
import { ObjectId } from "mongodb";
import { logoutHandler } from "./log-out";
const generateVerificationCode = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString(); // Generates a random 7-digit number
};
export const authRouter = router({
  createUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      try {
        console.log("start of the router");
        const { email, firstName, lastName, phone, password } = input;
        const db = await connectToDB();
        console.log("connected to db", db);

        const users = await db!.collection("users").findOne({ email });
        if (users) {
          throw new Error("User already exists with this email.");
        }

        console.log("User does not exist, proceeding to create");
        // const emailVerificationtoken = jwt.sign({ email }, process.env.JWT_SECRET!, {
        //   expiresIn: "1h",
        // });
        const emailVerificationCode = generateVerificationCode();
         await db!.collection("users").insertOne({
          email,
          firstName,
          lastName,
          phone,
          password,
          emailVerificationCode,
          role: "user",
          createdAt: new Date(),
        });
        console.log("created the user");

        await sendVerificationEmail(email, emailVerificationCode);
        return {
          success: true,
          sentToEmail: email,
          code: emailVerificationCode
        };
      } catch (error) {
        console.error("Error during mutation:", error);
        throw new Error("Failed to create user.");
      }
    }),
  verifyEmail: publicProcedure
    .input(z.object({ emailVerificationCode: z.string() }))
    .query(async ({ input }) => {
      const { emailVerificationCode } = input;
      const db = await connectToDB();
      const isVerified = await db!.collection("users").findOne({ emailVerificationCode });

      if (!isVerified) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return { success: true };
    }),
  signIn: 
  publicProcedure
    
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
      const db = await connectToDB();
      console.log("connected?", db);
      const user = await db!.collection("users").findOne({ email });
      console.log("does user exist?", user)
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      if (password !== user.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }
      const secret = process.env.JWT_SECRET!;
      const token = jwt.sign({ sub: user._id }, secret, {
        expiresIn: 60 * 60,
      });
      console.log(token);
      const cookieOptions = {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60,
      };
      cookies().set('token', token, cookieOptions);

      return {
        success: true,
        token,
      };
      } catch (err: any) {
        throw err;
      }
     
    }),
  logOut: protectedProcedure.mutation(() => logoutHandler()),
  updateUsersFirstName: protectedProcedure.input(z.object({
    userId: z.string(),
    firstName: z.string(),
  })).mutation(async ({input}) => {
    try{
      const { userId, firstName } = input;
      const db = await connectToDB();
      const user = await db!.collection("users").findOne({ _id: new ObjectId(userId) });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      await db!.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { firstName } });
      return { success: true };
    } catch (err) {
      throw err;
    }
  }),
  updateUsersPassword: protectedProcedure.input(z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
    userId: z.string(),
  })).mutation(async ({input}) => {
    try{
      const { userId, currentPassword, newPassword } = input;
      const db = await connectToDB();
      const user = await db!.collection("users").findOne({ _id: new ObjectId(userId)  });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (user.password !== currentPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Current password is incorrect",
        });
      }
      await db!.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { password: newPassword } });
      return { success: true };
    } catch (err){
      throw err;
    }
  }),
  authParcelPro: publicProcedure.input(z.object({
    username: z.string(),
    password: z.string(),
  })).query(async ({input}) => {
    try {
      const {username, password} = input;
      console.log(username, password);
      // const credentials = {
      //   username: username,
      //   password: password,

      // }
      const response = await fetch('https://apibeta.parcelpro.com/v2.0/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          grant_type: "password",
          username: username,
        })
      });
      console.log(response);
    const getResponse = await response.json();
    console.log(getResponse);

    return {
      success: true,
      getResponse,
    }
    } catch (err){
      console.log("somethign went wrong", err);
    }
     
  }),
  parcel: publicProcedure.input(z.object({
    username: z.string(),
    password: z.string(),
  })).mutation(async ({input}) => {
      try{
        const {username, password} = input;
        console.log(username, password);
        
        const response = await fetch('https://apibeta.parcelpro.com/v2.0/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            grant_type: "password",
            username: username,
          })
        });
        console.log(response);
      const getResponse = await response.json();
      console.log(getResponse);
      return {
        success: true,
        getResponse,
      }
      } catch (err){
        console.log("something went wrong", err);
        throw err
      }
  }),

});
