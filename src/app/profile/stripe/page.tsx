"use client";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements, CardElement, useStripe, useElements, PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { trpc } from '@/app/trpc/client';
// Assuming you have an api utility to call your tRPC functions
import { toast } from "sonner";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isLoading } = trpc.payment.savePaymentMethod.useMutation({
    onError: (err) => {
      toast.error("something went wrong.");
      console.log(err);
    },
    onSuccess: () => {
      toast.success("successfull.");
    },
  })
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Stripe.js hasn't loaded yet

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (stripeError) {
      setError(stripeError.message!);
      setLoading(false);
      return;
    }

    // You can now send the payment method to your backend for storage
    // const response = await api.user.savePaymentMethod.mutate({
    //   paymentMethodId: paymentMethod?.id,
    // });


    mutate({ paymentMethodId: paymentMethod?.id });


    // if (response.success) {
    //   alert('Payment method saved successfully!');
    // } else {
    //   alert('Error saving payment method.');
    // }

    setLoading(false);
  };

  return (
    <form className='mx-auto w-[50%]' onSubmit={handleSubmit}>
      {/* <div className="border p-2 rounded-lg">
        <label className="block mb-1">Card Number</label>
        <CardNumberElement className="p-2 border rounded-lg" />
      </div>

      <div className="mt-4 flex space-x-4">
        <div className="flex-1 border p-2 rounded-lg">
          <label className="block mb-1">Expiry Date</label>
          <CardExpiryElement className="p-2 border rounded-lg" />
        </div>
        <div className="flex-1 border p-2 rounded-lg">
          <label className="block mb-1">CVC</label>
          <CardCvcElement className="p-2 border rounded-lg" />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg w-full"
      >
        {loading ? 'Saving...' : 'Save Payment Method'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>} */}
      <CardElement />
    
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        {loading ? 'Saving...' : 'Save Payment Method'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};
const StripeSave = () => {
  return (
    <div className='w-full'>
      <Elements stripe={stripePromise}>

        {/* <div className="container mx-auto">
        <h1 className="text-2xl mb-4">Save Payment Method</h1>
        <CheckoutForm />
      </div> */}
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default StripeSave