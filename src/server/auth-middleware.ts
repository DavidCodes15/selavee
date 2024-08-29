import { cookies } from "next/headers";
import { TRPCError } from '@trpc/server';
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export const deserializeUser = async () => {
  const cookieStore = cookies();
  try {
    let token;
    if (cookieStore.get("token")) {
      token = cookieStore.get("token")?.value;
    }

    const notAuthenticated = {
      user: null,
    };

    if (!token) {
      return notAuthenticated;
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { sub: string };

    if (!decoded) {
      return notAuthenticated;
    }// else{
    //   console.log("decoded", decoded);
    //   console.log("decoded-sub", decoded.sub)
    //   console.log("token", token);
      
    // }
    const db = await connectToDB();
    const user = await db!.collection("users").findOne({ _id: new ObjectId(decoded.sub) });

    if (!user) {
      return notAuthenticated;
    }
    // console.log("user", user)
    // console.log("user id", user._id)
    

    const { password, ...userWithoutPassword } = user;
    return {
      success: "true",
      token,
      user: userWithoutPassword,
    };

  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
