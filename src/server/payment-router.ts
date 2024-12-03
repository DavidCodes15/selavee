import { protectedProcedure, router } from "./trpc";
import z from "zod";
import Stripe from 'stripe'
import { ObjectId } from "mongodb";
import { TRPCError } from "@trpc/server";
const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ?? '',
    {
      typescript: true,
    }
  )
import { connectToDB } from "@/lib/mongodb";
export const paymentRouter = router({
  savedPayments: protectedProcedure.input(z.object({
    userId: z.string(),
  })).query(async ({input}) => {
    try{
      const {userId} = input;
      const db = await connectToDB();
    const user = await db!.collection("users").findOne({ _id: new ObjectId(userId) });
    if(!user){
      throw Error("not authorized");
    }
    if (!user?.stripeCustomerId) return [];
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: "card",
    });
    return paymentMethods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card?.brand,
      last4: pm.card?.last4,
      expMonth: pm.card?.exp_month,
      expYear: pm.card?.exp_year,
    }));
    } catch(err){
      console.log("something went wrong", err);
      throw err;
    }
  }),  
  savePaymentMethod: protectedProcedure.input(z.object({
        paymentMethodId: z.string(),
    })).mutation(async ({input, ctx}) => {
        try{
            const {paymentMethodId} = input;
            console.log(ctx.user?._id);
            const userId = ctx.user?._id;

            if (!userId) {
                throw new Error('Not authenticated');
              }

            const db = await connectToDB();
            const user = await db!.collection('users').findOne({ _id: new ObjectId(userId) });
            let customerId = user?.stripeCustomerId;
            if (!customerId) {
                // Create a new Stripe customer if they don't have one
                const customer = await stripe.customers.create({
                  email: user?.email,
                });
                customerId = customer.id;
                await db!.collection('users').updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { stripeCustomerId: customerId } }
                  );
            }
            await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
            return {
                success: true,
            }
        } catch (err) {
            console.log("something went wrong", err);
            throw err;
        }
        
       
    }),
})