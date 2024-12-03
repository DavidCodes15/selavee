"use client";
import { trpc } from "@/app/trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
import { Edit2Icon, Trash2Icon, X } from "lucide-react";
import StripeSave from "./stripe/page";
import { useOrdersChange } from "@/hooks/use-state";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
type Address = {
    apartmentSuite: string;
    city: string;
    country: string;
    isDefault: boolean;
    phone: string;
    state: string;
    streetAddress: string;
    userId: string;
    zip: string;
    _id: string;









};

// type UserAddress = {
//     user: Address[];
// };
const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState("Main-info");
    const categories = ['Main-info', 'My orders', 'Address', 'Password', 'Payment method'];
    const [isHover, setIsHover] = useState(0);
    const [wantChange, setWantChange] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [apartmentSuite, setApartmentSuite] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const { orders } = useOrdersChange();
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    // const fetchUserAddress = async (userId: string) => {
    //     try {
    //         const { data, isLoading: isAddressLoading } = trpc.auth.fetchUserAddress.useQuery({ userId });
    //     } catch (error) {
    //         console.error("Error fetching address:", error);
    //     }
    // };
    const handleInputChange = (
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const { mutate: deliveryMutate, isLoading: deliveryLoading } = trpc.auth.userAddress.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {

            toast.success("successfully saved your delivery address.");
            refetch();
            setWantChange(false);
        },
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = (await getAuthUser({
                    shouldRedirect: false,
                })) as unknown as User;
                if (user && typeof user !== "string") {
                    setUser(user);
                    console.log(user);
                    // await fetchUserAddress(user._id);
                } else {
                    setUser("not authorized");
                }
            } catch (error) {
                setUser("not authorized");
            }
        };

        fetchUser();
    }, []);
    // const isAuthorizedUser = (user: User | "not authorized" | null): user is User => {
    //     return typeof user !== "string" && user !== null;
    // };
    const { data: userAddress, isLoading: isUserAdderss, refetch } = trpc.auth.fetchUserAddress.useQuery(
        { userId: typeof user !== 'string' && user?._id ? user._id : '' },
        {
            enabled: typeof user !== 'string' && user?._id !== undefined,  // Enabled only if the user is logged in

        }
    )
    console.log("user address", userAddress);
    const handleShipping = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof user !== 'string' && user?._id) {
            deliveryMutate({ streetAddress, apartmentSuite, city, state, country, zip, phone, userId: user._id, default: false });
            // setWantChange(false);
        } else {
            console.log("User is not authorized");
            toast.error("you have to be logged in!");
        }
    }

    const { mutate: firstNameMutate, isLoading: firstNameLoading } = trpc.auth.updateUsersFirstName.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {

            toast.success("successfully changed the first name.");
        },
    });
    const { data: savedPayment, isLoading: isPaymentSaved } = trpc.payment.savedPayments.useQuery(
        { userId: typeof user !== 'string' && user?._id ? user._id : '' },
        {
            enabled: typeof user !== 'string' && user?._id !== undefined,  // Enabled only if the user is logged in

        }
    )

    console.log(savedPayment);
    const { mutate: passwordMutate, isLoading: passwordLoading } = trpc.auth.updateUsersPassword.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {

            toast.success("successfully changed the password name.");
        },
    })

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
    const { mutate: deleteAddress, isLoading: isDeletingAddress } = trpc.auth.deleteDeliveryAddress.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
            console.log(err);
        },
        onSuccess: () => {
            toast.success("successfully deleted the address.");
            refetch();
        },
    })
    const { mutate: stripeMutate, isLoading: isStripeLoading } = trpc.payment.savePaymentMethod.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
            console.log(err);
        },
        onSuccess: () => {
            toast.success("successfull.");
        },
    })
    const { mutate: updateAddress, isLoading: isUpdatingAddress } = trpc.auth.updateUserAddress.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
            console.log(err);
        },
        onSuccess: () => {
            toast.success("successfully deleted the address.");
            setIsEditing(false);
            refetch();
        },
    })
    const handleInfoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof user !== 'string' && user?._id) {
            firstNameMutate({ firstName, userId: user._id });

        } else {
            console.log("User is not authorized");
            toast.error("you have to be logged in!");
        }
    }
    const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof user !== 'string' && user?._id) {
            if (newPassword === repeatNewPassword) {
                passwordMutate({ currentPassword, newPassword, userId: user?._id });
            } else {
                toast.error("passwords should match.")
            }


        } else {
            console.log("User is not authorized");
            toast.error("you have to be logged in!");
        }
    }
    const handleDefaultAddressChange = (addressId: string) => {
        defaultAddressMutate({ addressId });
    }
    const handleDeleteAddress = (addressId: string) => {
        deleteAddress({ addressId });
    }
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    // const handleEditAddress = ({ streetAddress, apartmentSuite, state, city, zip, phone, id, country }: { streetAddress: string, apartmentSuite?: string, state: string, city: string, zip: string, phone: string, id: string, country: string }) => {

    //     setIsEditing(true);
    // };]
    const handleStripe = () => {
        const paymentMethodId = "12312323"
        stripeMutate({ paymentMethodId });
    }
    const handleEditAddress = ({
        streetAddress,
        apartmentSuite,
        state,
        city,
        zip,
        phone,
        id, // This should match the expected property in the type definition
        country,
        defaultAddress,
        userId,

    }: {
        streetAddress: string;
        apartmentSuite: string;
        state: string;
        city: string;
        zip: string;
        phone: string;
        id: string;
        country: string;
        defaultAddress: boolean;
        userId: string;
    }) => {
        if (isEditing) {
            setIsEditing(false);

        } else {
            setEditingAddress({
                streetAddress,
                apartmentSuite,
                state,
                city,
                zip,
                phone,
                _id: id, // Assuming you want to use _id to match your address type
                country,
                isDefault: defaultAddress,
                userId,
            });
            setIsEditing(true);
        }

    };
    const handleUpdateAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(editingAddress);
        if (editingAddress !== null) {
            updateAddress(editingAddress);
        }

    }
    return (
        <>
            <MaxWidthWrapper className="mt-80 min-h-screen">

                <div className="w-full flex flex-col justify-center items-center space-y-16">
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-[24px] tracking-widest">Profile</h1>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <ul className="flex justify-center items-center space-x-8 tracking-widest text-[16px] text-[#666666]">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`cursor-pointer pb-2 ${selectedCategory === category ? 'border-b-2 border-black' : ''
                                        }`}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        {selectedCategory === "Main-info" && (
                            <>
                                <div className="w-full flex justify-center items-center border-black border-solid border-[2px]">
                                    <form onSubmit={handleInfoSubmit} className="m-24 w-[30%] flex flex-col justify-center items-center space-y-4">

                                        {user !== "not authorized" ? (
                                            <>
                                                <input value={firstName} placeholder={user?.firstName} onChange={handleInputChange(setFirstName)} type="text" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                                <input type="text" value={user?.lastName} className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6" />
                                                <input type="text" value={user?.email} className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 " />
                                                <button type="submit" className="w-full bg-black text-white font-semibold text-[16px] tracking-widest py-4">
                                                    {firstNameLoading ? (
                                                        <>
                                                            SAVING...
                                                        </>
                                                    ) : (
                                                        <>
                                                            SAVE THE CHANGES
                                                        </>
                                                    )}
                                                </button>

                                            </>
                                        ) : (
                                            <>
                                                <span className="text-[18px] tracking-widest flex justify-center items-center">You are not logged in !</span>
                                            </>
                                        )}

                                    </form>
                                </div>
                            </>
                        )}
                        {selectedCategory === "My orders" && (
                            <>
                                <div className="p-28 w-full flex justify-center items-center border-black border-solid border-2">
                                    {/* {orders.length === 0 ? (
                                        <div className="m-80 w-[40%] flex justify-center items-center">
                                            <h2 className="text-[18px] tracking-widest">No Orders Made Yet</h2>
                                        </div> */}
                                    {orders.length === 0 ? (
                                        <div className="m-80 w-[40%] flex justify-center items-center">
                                            <h2 className="text-[18px] tracking-widest">No Orders Made Yet</h2>
                                        </div>
                                    ) : (
                                        <div className="w-full flex flex-col justify-center items-start space-y-12">
                                            {orders.map((order, index) => (
                                                <div key={index} className="w-1/2 mx-auto flex flex-col justify-center items-center space-y-4">
                                                    <div className="w-full flex justify-center items-start space-x-6">
                                                        <div className="relative w-[300px] h-[300px]">
                                                            {order.products.map((product, productIndex) => (
                                                                <div
                                                                    key={productIndex}
                                                                    className="absolute"
                                                                    style={{
                                                                        top: `${productIndex * 5}px`, // Slightly offset each image
                                                                        right: `${productIndex * 15}px`,
                                                                        transform: `rotate(${Math.random() * 10 - 5}deg)`, // Add a random rotation
                                                                        zIndex: order.products.length - productIndex, // Ensure stacking order
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={product.selectedImageUrl}
                                                                        alt={product.productName}
                                                                        className="w-[300px] h-[300px] object-cover"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex flex-col justify-center items-start space-y-4">
                                                            <span className="font-semibold">{order.products.length} Items</span>
                                                            <span className="font-semibold">ORDER NO.: {order.tracking_number}</span>
                                                            <span className="font-semibold">Shipped Date:</span>{" "}
                                                            {new Date(order.purchasedAt).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex justify-center items-center">
                                                        <button className="w-full bg-transparent flex justify-center items-center text-black border-black border-solid border-[1px] py-4">TRACK ORDER</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}


                                </div>
                            </>
                        )}
                        {selectedCategory === "Address" && (
                            <>
                                <div className="w-full flex justify-center items-center border-black border-solid border-2">
                                    <div className="w-[50%] pt-12 pb-12 flex flex-col justify-center items-center space-y-4">
                                        {(userAddress?.user.length !== 0) && (wantChange === false) ? (
                                            <>
                                                {isUserAdderss ? (
                                                    <>
                                                        Loading....</>
                                                ) : (
                                                    <>
                                                        <div className="w-full flex flex-col justify-center items-center space-y-16">


                                                            <button onClick={() => setWantChange(true)} className="w-[70%] py-4 text-[16px] tracking-widest text-white bg-black flex justify-center items-center">
                                                                ADD ADDRESS
                                                            </button>
                                                            {/* <div className=" w-full pl-12 flex justify-between items-start"> */}


                                                            {/* <div className="w-full flex flex-col justify-center items-start space-y-6"> */}


                                                            {userAddress?.user.map((address, index) => (
                                                                <div className="w-full pl-12 flex justify-between items-start">
                                                                    <div className="w-full flex flex-col justify-center items-start space-y-6" key={index}>
                                                                        {isEditing && editingAddress && editingAddress._id === address._id ? (
                                                                            <>
                                                                                <form onSubmit={handleUpdateAddress} className="w-full flex flex-col justify-center items-start space-y-4">
                                                                                    <div className="w-full flex flex-col justify-center items-start">
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.streetAddress} onChange={(e) => setEditingAddress({ ...editingAddress, streetAddress: e.target.value })} placeholder="street address" />
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.apartmentSuite} onChange={(e) => setEditingAddress({ ...editingAddress, apartmentSuite: e.target.value })} placeholder="apartment suite" />
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.city} onChange={(e) => setEditingAddress({ ...editingAddress, city: e.target.value })} placeholder="city" />
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.state} onChange={(e) => setEditingAddress({ ...editingAddress, state: e.target.value })} placeholder="state" />
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.country} onChange={(e) => setEditingAddress({ ...editingAddress, country: e.target.value })} placeholder="country" />
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.zip} onChange={(e) => setEditingAddress({ ...editingAddress, zip: e.target.value })} placeholder="zip" />
                                                                                        <input type="text" className="w-[60%] text-[16px] tracking-widest border-b-[1px] border-solid border-black p-4" value={editingAddress.phone} onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })} placeholder="phone" />
                                                                                        <button type="submit" className="bg-black text-[16px] text-white tracking-widest w-[60%] p-4">Update</button>
                                                                                    </div>
                                                                                </form>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="w-full flex flex-col justify-center items-start space-y-4">

                                                                                    <div className="w-full flex flex-col justify-center items-start">
                                                                                        <span className="text-[16px] tracking-widest">{address.streetAddress}</span>
                                                                                        <span className="text-[16px] tracking-widest">{address.apartmentSuite}</span>
                                                                                        <span className="text-[16px] tracking-widest">{address.city}</span>
                                                                                        <span className="text-[16px] tracking-widest">{address.state}</span>
                                                                                        <span className="text-[16px] tracking-widest">{address.country}</span>
                                                                                        <span className="text-[16px] tracking-widest">{address.zip}</span>
                                                                                        <span className="text-[16px] tracking-widest">{address.phone}</span>
                                                                                    </div>
                                                                                    <div className="flex justify-start items-center w-full space-x-4">
                                                                                        <input className="cursor-pointer" type="checkbox" checked={address.default} onClick={() => handleDefaultAddressChange(address._id)} />
                                                                                        <label className="text-[15px] text-gray-500 ">Set as default delivery address</label>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )}


                                                                    </div>
                                                                    <div className="flex flex-col justify-center items-center">
                                                                        <Trash2Icon onClick={() => handleDeleteAddress(address._id)} className="cursor-pointer" />
                                                                        {/* <div>
                                                                                {address}
                                                                                </div> */}

                                                                        <Edit2Icon onClick={() => handleEditAddress({
                                                                            streetAddress: address.streetAddress,
                                                                            apartmentSuite: address.apartmentSuite,
                                                                            state: address.state,
                                                                            city: address.city,
                                                                            zip: address.zip,
                                                                            phone: address.phone,
                                                                            id: address._id, // use _id or ensure that you have an id field in your address type
                                                                            country: address.country,
                                                                            defaultAddress: address.default,
                                                                            userId: address.userId,
                                                                        })} className="cursor-pointer" />


                                                                    </div>
                                                                </div>
                                                            ))}






                                                            {/* </div> */}
                                                        </div>
                                                    </>
                                                )}

                                            </>
                                        ) : (
                                            <>
                                                <h2 className="w-full text-[16px] tracking-widest flex justify-center items-center">
                                                    Add your delivery address !
                                                </h2>
                                                <form onSubmit={handleShipping} className="mt-12 w-full flex flex-col justify-center items-start space-y-4">
                                                    <input value={streetAddress} onChange={handleInputChange(setStreetAddress)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-[16px] placeholder:tracking-widest placeholder:text-black" placeholder="Street Address" />
                                                    <input value={apartmentSuite} onChange={handleInputChange(setApartmentSuite)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6  placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Apartment Suite" />
                                                    <input value={city} onChange={handleInputChange(setCity)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6  placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="City" />
                                                    <input value={state} onChange={handleInputChange(setState)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6  placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="State" />
                                                    <input value={country} onChange={handleInputChange(setCountry)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6  placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Country" />
                                                    <input value={zip} onChange={handleInputChange(setZip)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6  placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder="Zip" />
                                                    {user !== "not authorized" && (
                                                        <input value={phone} onChange={handleInputChange(setPhone)} type="text" className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6  placeholder: text-[14px] placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder={user?.phone} />
                                                    )}
                                                    {/* <input type="text" className="outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black" placeholder={user?.phone} />  */}
                                                    <button type="submit" className="text-white tracking-widest text-[16px] bg-black flex justify-center items-center w-full py-4">
                                                        {deliveryLoading ? (
                                                            <>
                                                                Saving....
                                                            </>
                                                        ) : (
                                                            <>
                                                                Save changes
                                                            </>
                                                        )}


                                                    </button>
                                                </form>
                                            </>
                                        )}


                                    </div>


                                </div>
                            </>
                        )}
                        {selectedCategory === "Password" && (
                            <>
                                <div className="w-full flex justify-center items-center border-black border-solid border-[2px]">
                                    <form onSubmit={handlePasswordSubmit} className="m-24 w-[30%] flex flex-col justify-center items-center spcae-y-4">

                                        {user !== "not authorized" ? (
                                            <>
                                                <input value={currentPassword} placeholder="enter current password" onChange={handleInputChange(setCurrentPassword)} type="password" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                                <input value={newPassword} placeholder="enter new password" onChange={handleInputChange(setNewPassword)} type="password" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                                <input value={repeatNewPassword} placeholder="repeat new password" onChange={handleInputChange(setRepeatNewPassword)} type="password" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />

                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                        <button type="submit" className="mt-12 w-full bg-black text-white font-semibold text-[16px] tracking-widest py-4">
                                            {passwordLoading ? (
                                                <>
                                                    SAVING...
                                                </>
                                            ) : (
                                                <>
                                                    SAVE THE CHANGES
                                                </>
                                            )}
                                        </button>

                                    </form>
                                </div>
                            </>
                        )}
                        {selectedCategory === "Payment method" && (
                            <>
                                <div className="w-full p-12 flex flex-col justify-center items-center border-black border-solid border-2">
                                    <div className="m-80 w-full flex justify-center items-center">
                                        <StripeSave />
                                    </div>

                                    <div className="w-full flex flex-col justify-center items-start space-y-4">
                                        <div className="flex justify-center items-center">
                                            <span className="text-[17px] tracking-widest font-semibold">Saved Payment Methods</span>
                                        </div>
                                        {savedPayment?.map((payment, index: number) => (
                                            // <div key={index} className="flex flex-col justify-center items-start">
                                            //    <span className="text-[16px] tracking-widest font-semibold">Brand: {payment.brand}</span> 
                                            //    <span className="text-[16px] tracking-widest font-semibold">Expiration: {payment.expMonth}/{payment.expYear}</span> 
                                            //    <span className="text-[16px] tracking-widest font-semibold">last four Digits: {payment.last4}</span> 
                                            // </div>
                                            <div key={index} className="flex flex-col justify-center items-start border-black border-[1px] rounded-md border-solid py-6 space-y-6 w-[50%] p-4">
                                                <span className="w-full text-[16px] tracking-widest font-semibold border-b-[1px] py-2 border-black border-solid">{payment.brand} ({payment.last4})</span>
                                                <span className="text-[16px] tracking-widest font-semibold">Exp: {payment.expMonth}/{payment.expYear}</span>
                                                {/* <span className="text-[16px] tracking-widest font-semibold">last four Digits: {payment.last4}</span> */}
                                                <span className="text-[16px] tracking-widest">Data Magaldadze</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default Page