"use client";
import { trpc } from "@/app/trpc/client";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "@/app/globals.css";
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
import Link from "next/link";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/stripe/checkout";
import { X } from "lucide-react";
import { useStateChange } from "@/hooks/use-state";
const Page = () => {
    const [quoteID, setQuoteID] = useState("");

    const [estimatedCost, setEstimatedCost] = useState(0);
    const handleInputChange = (
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    // const [token, setToken] = useState("");
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [streetAddress, setStreetAddress] = useState("");
    const [apartmentSuite, setApartmentSuite] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const password = "Credentials648045"
    const username = "648045API"
    const { data: deliveryAddress, isLoading: isDeliveryLoading } = trpc.auth.checkDeliveryAddress.useQuery(
        user && typeof user !== "string" ? { userId: user._id } : undefined as never,
        {
            enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
            onSuccess: (data) => {
                console.log("delivery Addresses: ", data);
            },
            onError: (err) => {
                console.error("Error fetching liked products: ", err);
            },
        }
    )
    const defaultAddress = useMemo(() => {
        if (deliveryAddress?.checked) {
            return deliveryAddress.checked.find((address) => address.default === true);
        }
        return null;
    }, [deliveryAddress]);

    // useEffect(() => {
    //     // Automatically trigger handleShipping when defaultAddress exists
    //     if (defaultAddress) {
    //         handleShipping();

    //     }
    // }, [defaultAddress]);
    console.log("Default Address: ", defaultAddress);
    const { data, isLoading } = trpc.product.checkTheBag.useQuery(
        user && typeof user !== "string" ? { userId: user._id } : undefined as never,
        {
            enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
            onSuccess: (data) => {
                console.log("Liked Products: ", data);
            },
            onError: (err) => {
                console.error("Error fetching liked products: ", err);
            },
        }
    );
    const { data: savedPayment, isLoading: isPaymentSaved } = trpc.payment.savedPayments.useQuery(
        { userId: typeof user !== 'string' && user?._id ? user._id : '' },
        {
            enabled: typeof user !== 'string' && user?._id !== undefined,  // Enabled only if the user is logged in

        }
    )
    console.log(data);
    const totalProductPrice = useMemo(() => {
        if (data?.checked) {
            return data.checked.reduce((acc, product) => acc + product.totalPrice, 0);
        }
        return 0;
    }, [data?.checked]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = (await getAuthUser({
                    shouldRedirect: false,
                })) as unknown as User;
                if (user && typeof user !== "string") {
                    setUser(user);
                    console.log(user);
                } else {
                    setUser("not authorized");
                }
            } catch (error) {
                setUser("not authorized");
            }
        };

        fetchUser();
    }, []);

    console.log(data?.checked);
    useEffect(() => {
        if (defaultAddress) {
            handleShipping();
        }
    }, [defaultAddress]);
    const [loading, setLoading] = useState(false);
    let totalPrice;
    if (estimatedCost === 0) {
        totalPrice = 1.00;
    } else {
        totalPrice = totalProductPrice + estimatedCost;
        console.log(estimatedCost, "when added to totalPrice");
        console.log(quoteID, "when added to totalPrice");
    }

    const handleDirectPayment = async () => {
        if (!savedPayment || savedPayment.length === 0) {
            toast.error("No saved payment method available.");
            return;
        }
        if (typeof user === "string" || user === null) {
            toast.error("User not authorized.");
            return;
          }
        try {
            // Example API call to process payment
            const response = await fetch("/api/payment/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: totalPrice,
                    paymentMethodId: savedPayment[0].id, // Assuming you’re using the first saved payment method
                    userId: user?._id,
                    quoteID, // Any other data you need
                }),
            });

            if (response.ok) {
                toast.success("Payment successful!");
            } else {
                toast.error("Payment failed.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Something went wrong with the payment.");
        }
    };
    const handleShipping = async () => {
        if (!defaultAddress) return;


        // if (event) {
        //     event.preventDefault();
        // }
        // event.preventDefault();
        const authApi = 'https://apibeta.parcelpro.com/v2.0/auth'; // Replace with your API URL
        const authData = {
            username,
            grant_type: "password",
            password,
        };
        const quoteApi = 'https://apibeta.parcelpro.com/v2.0/quotes'
        const quoteData = {
            "CarrierCode": 1,
            "CodAmount": 1,
            "InsuredValue": "2000",
            "IsCod": true,
            "IsBillToThirdParty": false,
            "BillToThirdPartyPostalCode": "",
            "BillToAccount": "",
            "IsDeliveryConfirmation": false,
            "IsDirectSignature": false,
            "IsDropoff": false,
            "IsPickUpRequested": false,
            "IsRegularPickUp": true,
            "IsReturnShipment": false,
            "IsSaturdayDelivery": false,
            "IsSaturdayPickUp": false,
            "IsSecuredCod": false,
            "IsThermal": false,
            "Length": 0,
            "PackageCode": "21",
            "ReferenceNumber": "475759059",
            "ReturnLabel": false,
            "ServiceCode": "01",
            "ShipDate": "2024-11-30",
            "ShipFrom": {
                "ContactType": 3,
                "CompanyName": "TEST COMPANY",
                "FirstName": "FIRSTFIRSTFIRST",
                "LastName": "LASTFIRSTFIRST",
                "StreetAddress": "9009 192nd Street Southwest",
                "ApartmentSuite": "",
                "City": "Edmonds",
                "State": "Wa",
                "Country": "US",
                "Zip": "98026",
                "TelephoneNo": "6576576587",
                "FaxNo": "",
                "Email": "test@test.com",
                "IsResidential": false
            },
            "ShipTo": {
                "ContactType": 11,
                "CompanyName": "TEST COMPANY",
                "FirstName": `${user !== "not authorized" ? user?.firstName : ""}`,
                "LastName": `${user !== "not authorized" ? user?.lastName : ""}`,
                "StreetAddress": defaultAddress ? defaultAddress.streetAddress : streetAddress,
                "ApartmentSuite": defaultAddress ? defaultAddress.apartmentSuite : apartmentSuite,
                "City": defaultAddress ? defaultAddress.city : city,
                "State": defaultAddress ? defaultAddress.state : state,
                "Country": defaultAddress ? defaultAddress.country : country,
                "Zip": defaultAddress ? defaultAddress.zip : zip,
                "TelephoneNo": defaultAddress ? defaultAddress.phone : phone,
                "FaxNo": "",
                "Email": `${user !== "not authorized" ? user?.email : ""}`,
                "IsResidential": false
            },
            "ShipToResidential": false,
            "UPSPickUpType": 0,
            "Weight": 1,
            "Width": 0
        }
        try {
            setLoading(true);
            const response = await fetch(authApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData),
            });

            const result = await response.json();
            const token = result.access_token;  // Extract the access_token
            setAccessToken(token);  // Store the access_token in state

            console.log('Access Token:', token);


            const quoteResponse = await fetch(quoteApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${token}`
                },
                body: JSON.stringify(quoteData),
            });
            const quoteResult = await quoteResponse.json();
            console.log(quoteResult);
            setEstimatedCost(quoteResult.TotalCharges);
            setQuoteID(quoteResult.QuoteId);
            // console.log(estimatedCost, quoteID);
            // console.log(quoteResult.Estimator[0].TotalCharges);
            // console.log(quoteResult.Estimator[0].QuoteID);
            console.log(quoteResult.TotalCharges);
            console.log(quoteResult.QuoteId);
            if (estimatedCost && quoteID !== null) {
                console.log(estimatedCost, quoteID);
            }


        } catch (err) {
            console.error('Error:', err);

        } finally {
            setLoading(false);
        }





    }
    const { data: userAddress, isLoading: isUserAdderss, refetch } = trpc.auth.fetchUserAddress.useQuery(
        { userId: typeof user !== 'string' && user?._id ? user._id : '' },
        {
            enabled: typeof user !== 'string' && user?._id !== undefined,  // Enabled only if the user is logged in

        }
    )
    const { mutate: defaultAddressMutate, isLoading: isDefaultAddress } = trpc.auth.defaultDeliveryAddress.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
            console.log(err);
        },
        onSuccess: (updated) => {
            console.log();
            if (updated.updated === true) {
                toast.success("successfully added the default address.");
            } else {
                toast.success("successfully removed the default address.");
            }

            refetch();
        },
    })
    const handleDefaultAddressChange = (addressId: string) => {
        defaultAddressMutate({ addressId });
    }

    const { items, removeItem } = useStateChange();
    const cartTotal = items.reduce(
        (total, { product }) => total + product.totalPrice,
        0
    )
    const itemCount = items.length;
    return (
        <>
            <MaxWidthWrapper className="mt-56 min-h-screen">
                <div className="flex justify-center items-center">
                    <h1 className="tracking-widest text-[24px]">Checkout</h1>
                </div>
                {isLoading ? (
                    <>
                        <div className="animate-pulse w-full mt-26 flex justify-center items-center space-x-2">
                            <div className="w-[748px] h-[870px] bg-gray-300 rounded" />


                            <div className="flex flex-col justify-center items-center space-y-4">
                                <div className="bg-gray-300 w-[428px] h-[382px] rounded" />
                                <div className="bg-gray-300 w-[428pxh-[128px] rounded" />
                            </div>


                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full mt-28 flex justify-between items-start space-x-2">
                            {/* <div className="w-[748px] h-[870px] bg-gray-300 rounded" /> */}
                            <div className="w-[60%] flex flex-col justify-center items-start space-y-6 mb-44">
                                <div className="w-full border-black border-solid border-[1px] px-12 py-6">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="w-full flex flex-col justify-center items-start space-y-6">
                                            <div>
                                                <span className="text-[14px] font-semibold tracking-widest">Products ({itemCount})</span>
                                            </div>
                                            {items.map(({ product }) => (
                                                <>
                                                    <div className="w-full flex justify-between items-start">


                                                        <div key={product._id} className="w-full flex justify-start space-x-4">
                                                            <div className="w-[160px]">
                                                                <img src={product.selectedImageUrl} />
                                                            </div>
                                                            <div className="flex flex-col justify-center items-start space-y-4">
                                                                {/* <div>
                                                                    <span className="text-[16px] tracking-widest">{product.productDetail}</span>
                                                                </div> */}
                                                                <div>
                                                                    <span className="text-[16px] tracking-widest">{product.productName}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-[16px] tracking-widest font-semibold">{product.totalPrice}$</span>
                                                                </div>

                                                                <div className="flex justify-start items-center space-x-[3px] mt-5">
                                                                    <div className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full " />
                                                                    <div className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                                                                    <div className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                                                                </div>

                                                                <div className="flex justify-start items-center space-x-4 mt-2">
                                                                    <div>
                                                                        Qty: {product.quantity}
                                                                    </div>
                                                                    <div>
                                                                        Size: {product.sizes[0].size}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </>
                                            ))}
                                            {/* {data?.checked.map((product, index) => (
                                                <>
                                                    <div className="w-full flex justify-between items-start">


                                                        <div key={index} className="w-full flex justify-start space-x-4">
                                                            <div className="w-[160px]">
                                                                <img src={product.productUrl} />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <span className="text-[16px] tracking-widest">{product.productDetail}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-[16px] tracking-widest">{product.productName}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-[16px] tracking-widest font-semibold">{product.totalPrice}$</span>
                                                                </div>

                                                                <div className="flex justify-start items-center space-x-[3px] mt-5">
                                                                    <div className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full " />
                                                                    <div className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                                                                    <div className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                                                                </div>

                                                                <div className="flex justify-start items-center space-x-4 mt-2">
                                                                    <div>
                                                                        Qty: {product.quantity}
                                                                    </div>
                                                                    <div>
                                                                        Size: {product.size}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </>
                                            ))} */}


                                        </div>
                                    </div>
                                </div>
                                <div className="w-full border-solid border-black border-[1px] px-12 py-6">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="w-full flex flex-col justify-center items-start space-y-6">
                                            <div className="flex justify-center items-center space-x-24">
                                                <span className="text-[16px] tracking-widest font-semibold">Delivery address</span>
                                                <span className="text-[14px] tracking-widest text-gray-500">DEFAULT</span>
                                            </div>
                                            {/* {deliveryAddress?.checked.length ? (
                                                deliveryAddress.checked.map((address) => (
                                                    <div key={address._id} className="w-full flex items-center space-x-4">
                                                        <input
                                                            type="radio"
                                                            name="selectedAddress"
                                                            value={address._id}
                                                            checked={address._id === defaultAddress?._id}
                                                            onClick={() => handleDefaultAddressChange(address._id)}
                                                            className="cursor-pointer"
                                                        />
                                                        <div className="flex flex-col space-y-2">
                                                            <span>{address.streetAddress}, {address.city}, {address.state}, {address.zip}, {address.country}</span>
                                                            <span>Phone: {address.phone}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span>No saved addresses available.</span>
                                            )} */}
                                            {defaultAddress ? (



                                                <div className="w-full flex flex-col justify-center items-start space-y-2">
                                                    <span className="w-full justify-between items-center text-[16px] tracking-widest">
                                                        {defaultAddress.streetAddress}

                                                    </span>
                                                    <span className="text-[16px] tracking-widest">{defaultAddress.apartmentSuite}</span>
                                                    <span className="text-[16px] tracking-widest">{defaultAddress.city}</span>
                                                    <span className="text-[16px] tracking-widest">{defaultAddress.state}</span>
                                                    <span className="text-[16px] tracking-widest">{defaultAddress.country}</span>
                                                    <span className="text-[16px] tracking-widest">{defaultAddress.zip}</span>
                                                    <span className="text-[16px] tracking-widest">{defaultAddress.phone}</span>
                                                </div>

                                            ) : (
                                                <form onSubmit={handleShipping} className="w-full flex flex-col justify-center items-start space-y-4">
                                                    <input value={streetAddress} onChange={handleInputChange(setStreetAddress)} type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Street Address" />
                                                    <input value={apartmentSuite} onChange={handleInputChange(setApartmentSuite)} type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Apartment Suite" />
                                                    <input value={city} onChange={handleInputChange(setCity)} type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="City" />
                                                    <input value={state} onChange={handleInputChange(setState)} type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="State" />
                                                    <input value={country} onChange={handleInputChange(setCountry)} type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Country" />
                                                    <input value={zip} onChange={handleInputChange(setZip)} type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Zip" />
                                                    {user !== "not authorized" && (
                                                        <input value={phone} onChange={handleInputChange(setPhone)} type="text" className="outline-none placeholder: text-[14px] placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder={user?.phone} />
                                                    )}

                                                    <button type="submit" className="text-white tracking-widest text-[16px] bg-black flex justify-center items-center w-[80%] py-4">
                                                        {loading ? (
                                                            <>
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Submit
                                                            </>
                                                        )}


                                                    </button>
                                                </form>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <div className="w-full border-solid border-black border-[1px] px-12 py-6">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="w-full flex flex-col justify-center items-start space-y-6">
                                            <div className="">
                                                <span className="text-[16px] tracking-widest font-semibold">Payment Method</span>
                                            </div>
                                            {savedPayment && savedPayment?.length > 0 ? (


                                                <>
                                                    {savedPayment?.map((payment, index: number) => (
                                                        <div key={index} className="flex flex-col justify-center items-start border-black border-[1px] rounded-md border-solid py-6 space-y-6 w-[50%] p-4">
                                                            <span className="w-full text-[16px] tracking-widest font-semibold border-b-[1px] py-2 border-black border-solid">{payment.brand} ({payment.last4})</span>
                                                            <span className="text-[16px] tracking-widest font-semibold">Exp: {payment.expMonth}/{payment.expYear}</span>
                                                            {/* <span className="text-[16px] tracking-widest font-semibold">last four Digits: {payment.last4}</span> */}
                                                            <span className="text-[16px] tracking-widest">Data Magaldadze</span>
                                                        </div>
                                                    ))}
                                                </>

                                            ) : (
                                                <>
                                                    <div className="w-full flex justify-center items-center">
                                                        <span className="text-[17px] tracking-widest">No Payment Method Saved</span>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex flex-col justify-center items-center space-y-4"> */}

                            <div className="w-[40%] border-black border-solid border-[1px] pt-16 pb-5">
                                <div className="w-full flex justify-center items-center">
                                    <div className="w-full flex flex-col justify-center space-y-6 px-6">
                                        {/* <div>
                                                <span className="font-semibold">Total</span>
                                            </div> */}
                                        <div className="w-full flex justify-start items-center space-x-2">
                                            <input type="checkbox" />
                                            <div className="flex justify-center items-center space-x-2">
                                                <span className="font-semibold tracking-widest">is this a gift?</span>
                                                <img src="/icons/gift.svg" className="w-[24px] h-[24px]" />
                                            </div>
                                        </div>
                                        {/* {savedPayment && savedPayment.length > 0 ? (
                                            <div className="w-full flex flex-col justify-center items-start space-y-4">
                                                
                                                <span>SUB-TOTAL: ${cartTotal}</span>
                                                <span>DISCOUNT: $0</span>
                                                <span>DELIVERY: ${estimatedCost}</span>
                                                <span className="font-semibold">TOTAL: ${cartTotal + estimatedCost}</span>
                                                <button
                                                    onClick={handleDirectPayment}
                                                    className="bg-black text-white text-[16px] tracking-widest text-center py-2 font-semibold w-full"
                                                    disabled={!savedPayment || savedPayment.length === 0}
                                                >
                                                    Pay with Saved Payment
                                                </button>
                                                



                                            </div>
                                        ) : ( */}
                                            <div className="w-full flex flex-col justify-center items-start space-y-4">
                                                {/* {totalPrice === 1 ? (
                                                    <>
                                                        <span className="text-[16px] flex justify-center items-center">Please enter your Address to move forward</span>
                                                    </>
                                                ) : ( */}
                                                {/* <> */}
                                                <span>SUB-TOTAL: ${cartTotal}</span>
                                                <span>DISCOUNT: $0</span>
                                                <span>DELIVERY: ${estimatedCost}</span>
                                                <span className="font-semibold">TOTAL: ${cartTotal + estimatedCost}</span>
                                                <Elements
                                                    stripe={stripePromise}
                                                    options={{
                                                        mode: "payment",
                                                        amount: convertToSubcurrency(cartTotal + estimatedCost),
                                                        currency: "usd",
                                                    }}
                                                >

                                                    <CheckoutPage amount={cartTotal + estimatedCost} quoteID={quoteID} token={accessToken} />
                                                </Elements>
                                               



                                            </div>
                                         {/* )}  */}
                                        {/* <div className="w-full flex flex-col justify-center items-start space-y-4">
                                            
                                            <span>SUB-TOTAL: ${cartTotal}</span>
                                            <span>DISCOUNT: $0</span>
                                            <span>DELIVERY: ${estimatedCost}</span>
                                            <span className="font-semibold">TOTAL: ${cartTotal + estimatedCost}</span>
                                            <Elements
                                                stripe={stripePromise}
                                                options={{
                                                    mode: "payment",
                                                    amount: convertToSubcurrency(totalPrice),
                                                    currency: "usd",
                                                }}
                                            >

                                                <CheckoutPage amount={totalPrice} quoteID={quoteID} token={accessToken} />
                                            </Elements>
                                           



                                        </div> */}
                                    </div>
                                </div>
                            </div>



                        </div>
                    </>
                )}
            </MaxWidthWrapper>
        </>
    )
}

export default Page;