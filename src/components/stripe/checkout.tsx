"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useStateChange, useOrdersChange } from "@/hooks/use-state";
const CheckoutPage = ({ amount, quoteID, token }: { amount: number, quoteID: string, token: string | null }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { items, clear: clearBag } = useStateChange();
  const { addMultipleOrders } = useOrdersChange();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    try {
      const shipmentApi = `https://apibeta.parcelpro.com/v2.0/shipments/${quoteID}`
      const createShipment = await fetch(shipmentApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        },

      })
      const result = await createShipment.json();
      const tracking_number = result.TrackingNumber;
      const shipment_id = result.ShipmentId;
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/payment-success?amount=${amount}&tracking=${tracking_number}&shipment=${shipment_id}`,
        },
      });
      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      // Process successful payment
      // const purchasedAt = new Date().toISOString();
      // const ordersToAdd = items.map(({ product }) => ({
      //   product,
      //   purchasedAt,
      //   tracking_number, // Use trackingNumber correctly
      //   amount,
      // }));

      // // Ensure items exist before moving to orders
      // if (items.length > 0) {
      //   addMultipleOrders(ordersToAdd);
      //   clearBag();
      //   toast.success("Purchase successful! Products moved to your orders.");
      // } else {
      //   toast.error("No items in the bag to process.");
      // }
      // if(!error){
      //   const purchasedAt = new Date().toISOString();
      //   const ordersToAdd = items.map(({ product }) => ({
      //     product,
      //     purchasedAt,
      //     tracking_number,
      //     amount
      //   }));
      //   addMultipleOrders(ordersToAdd);
      //   clearBag();
      //   toast.success("Purchase successful! Products moved to your orders.");

      // }else {
      //   setErrorMessage(error.message);
      // }


      
    } catch (err) {
      console.error("Error during payment and shipment:", err);
    setErrorMessage("Something went wrong. Please try again.");
    } finally{
      setLoading(false);
    }

  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;