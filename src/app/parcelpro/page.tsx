"use client";
import { cookies } from 'next/headers';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from 'sonner';
import { trpc } from '../trpc/client';
// const AddressValidator = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// });

// type TAddressValidator = z.infer<typeof AddressValidator>;
const Page = () => {

    const password = "Credentials648045"
    const username = "648045API"

    // const { data, isLoading } = trpc.auth.authParcelPro.useQuery({
    //     username, password
    // });
    const {mutate, isLoading} = trpc.auth.parcel.useMutation({
        onError: (err) => {
            console.log("something went wrong", err);
            toast.error("something went wrong")   
        },
        onSuccess: (success) => {
            console.log("successfully got the token", success);
            toast.success("successfully fetched auth");
        }
    })
    // console.log(data);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<TAddressValidator>({
    //     resolver: zodResolver(AddressValidator),
    // });
    const [qouteId, setQuoteId] = useState();
    const fetchQoute = async () => {
        const packageDetails = {

        }
        // const token = cookies().get("token");
        const token = "sadsadsd"
        const response = await fetch("api/parcelpro/quote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(packageDetails)
        })
        const quoteResponse = await response.json();
        if (quoteResponse.isSuccessful) {
            setQuoteId(quoteResponse.getQuoteId());
        } else {
            console.error(`Error: ${quoteResponse.getError()}`);
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate({username, password});
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='mt-44 bg-black text-white flex flex-col justify-center items-center'>
                <input type='text' placeholder='Country' />
                <input type='text' placeholder='City' />
                <input type='text' placeholder='Street' />
                <input type='text' placeholder='ZipCode' />
                <button className='cursor-pointer' type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Page;