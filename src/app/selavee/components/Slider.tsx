"use client";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { upload } from "@vercel/blob/client";
const SliderDisplay = () => {
    const { mutate: deleteImage } = trpc.product.deleteSliderImage.useMutation({
        onSuccess: () => {
            toast.success("Image deleted successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to delete image.");
        },
    });
    const { mutate: addImage } = trpc.product.addSliderImage.useMutation({
        onSuccess: () => {
            toast.success("Image added successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to add image.");
        },
    });
    const handleDelete = (imageUrl: string) => {
        deleteImage({ imageUrl });
    };
    const handleAdd = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const response = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload", // Provide the handleUploadUrl
                });
                if (response.url) {
                    addImage({ imageUrl: response.url });
                }
            } catch (err) {
                toast.error("Failed to upload image.");
            }
        }
    };
    const { data: products, isLoading, refetch } = trpc.product.fetchSliderImages.useQuery();
    return (
        <>
            <div className="rounded-xl bg-[#21222D] p-6 flex flex-col space-y-6 h-full text-white">

                <div className="text-white font-semibold">
                    <span className="text-[22px]">Slider</span>
                </div>

                <div className="bg-[#171821] p-6 rounded-xl grid grid-cols-5 gap-4">
                    {isLoading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            {products?.images[0].secondaryImages.map((product: string, index: number) => (
                                <div key={index} className="relative">
                                    <img src={product} className="w-[500px] h-[200px] rounded-lg" />
                                    <button onClick={() => handleDelete(product)} className="absolute top-5 right-5">
                                        <Trash color="red" />
                                    </button>
                                </div>
                            ))}
                            <label className="cursor-pointer w-[300px] h-[200px] rounded-lg bg-gray-300 flex">
                                <span className="w-full h-full flex justify-center items-center text-[20px] text-black">
                                    Add
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAdd}
                                    className="hidden"
                                />
                            </label>
                            {/* <div className="cursor-pointer w-[300px] h-[200px] rounded-lg bg-gray-300 flex">
                                <span className="w-full h-full flex justify-center items-center text-[20px] text-black">Add</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAdd}
                                    className="hidden"
                                />
                            </div> */}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default SliderDisplay