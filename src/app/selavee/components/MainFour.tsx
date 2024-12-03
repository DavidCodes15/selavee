"use client";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { Loader2 } from "lucide-react";
const MainFour = () => {
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const { data, isLoading: areProductsLoading, refetch } = trpc.product.fetchMainPageProducts.useQuery();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImageFiles(Array.from(files)); // Store the files in state
        }
    };
    const { mutate, isLoading } = trpc.product.createMainPageProduct.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {
            toast.success("upload was successfull.");
            setImageFiles([]);
            setImageURLs([]);
            refetch();
        },
    })
    const { mutate: deletionMutate, isLoading: isDeleting } = trpc.product.deleteMainPageProducts.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {
            toast.success("deleted successfully.");
            // router.push("/selavee/admin");
            refetch();
        },
    });
    const handleDelete = () => {
        deletionMutate();
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageFiles.length > 0) {
            const mainImages: { [key: string]: string } = {};
            const secondaryImages: string[] = [];
            const mainImageNames = [
                "first-product",
                "second-product",
                "third-product",
                "fourth-product",
            ];
            let currentIndex = 0;
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const fileName = file.name.toLowerCase().replace(/\s+/g, "-").replace(/\.[^.]+$/, "");
              
                console.log(fileName);
                console.log(file.name);


             
                const response = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload",
                });
                console.log(response.url);
                if (response.url) {
                    if (mainImageNames.includes(fileName)) {
                        console.log(mainImages);
                        mainImages[fileName] = response.url;
                    } else {
                        secondaryImages.push(response.url);
                    }
                }

            }
            const payload = {
                firstProduct: mainImages["first-product"],
                secondProduct: mainImages["second-product"],
                thirdProduct: mainImages["third-product"],
                fourthProduct: mainImages["fourth-product"],
                // firstLabel: labels[0],
                // secondLabel: labels[1],
                // thirdLabel: labels[2],
                // fourthLabel: labels[3],
                secondaryImages,
            }
            console.log(payload);
            mutate(payload);
        }
    };
    return (
        <>
            <div className="rounded-xl bg-[#21222D] p-6 flex flex-col space-y-6 h-full text-white">
                <div className="text-white font-semibold">
                    <span className="text-[22px]">Main Product Images</span>
                </div>
                <div className="bg-[#171821] rounded-xl p-6">
                    {areProductsLoading ? (
                        <>Loading....</>
                    ) : data?.products.length !== 0 ? (
                        <div className="w-full flex justify-center items-start space-x-6">
                            <div className="w-full grid grid-cols-2 gap-y-6 gap-x-0">
                                <div className="w-[300px] h-[300px]">
                                    <img className="w-full h-full" src={data?.products[0].firstProduct} />
                                </div>
                                <div className="w-[300px] h-[300px]">
                                    <img className="w-full h-full" src={data?.products[0].secondProduct} />
                                </div>
                                <div className="w-[300px] h-[300px]">
                                    <img className="w-full h-full" src={data?.products[0].thirdProduct} />
                                </div>
                                <div className="w-[300px] h-[300px]">
                                    <img className="w-full h-full" src={data?.products[0].fourthProduct} />
                                </div>
                            </div>
                            <Trash onClick={handleDelete} color="red" className="cursor-pointer" />
                        </div>
                    ) : (


                        <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center space-y-4">
                                <label className="text-[16px] tracking-widest font-semibold">Upload your products here by their order</label>
                                <input
                                    type="file"
                                    id="mainImage"
                                    name="mainImage"
                                    className="flex cursor-pointer items-center justify-center pl-28"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <button type="submit" disabled={isLoading} className="text-white text-[16px] tracking-widest w-full py-4 bg-black disabled:bg-gray-500">
                                    {isLoading ? (
                                        <>
                                            <span className="flex justify-center items-center space-x-2">
                                                <span>Uploading</span>
                                                <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Upload the product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>


                    )}
                </div>
            </div>
        </>
    )
}

export default MainFour