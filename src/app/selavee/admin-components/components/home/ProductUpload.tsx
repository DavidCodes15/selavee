"use client";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { upload } from "@vercel/blob/client";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { DeleteIcon, Loader2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
const ProductUpload = () => {
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
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
            setIsSuccess(true);
        },
    })
    const {mutate: deletionMutate, isLoading: isDeleting} = trpc.product.deleteMainPageProducts.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {
            toast.success("deleted successfully.");
            // router.push("/selavee/admin");
        },
    });
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageFiles.length > 0) {
            const mainImages: { [key: string]: string } = {};
            // const secondaryImages: { [key: string]: string } = {};
            const secondaryImages: string[] = [];
            const mainImageNames = [
                "first-product",
                "second-product",
                "third-product",
                "fourth-product",
            ];
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const fileName = file.name.toLowerCase().replace(/\s+/g, "-").replace(/\.[^.]+$/, "");
                const response = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload",
                });

                // if (response.url) {
                //   urls.push(response.url); // Store the URLs
                // }
                // if (response.url) {
                //   if (mainImageNames.includes(fileName)) {
                //     mainImages[fileName] = response.url;
                //   } else {
                //     secondaryImages.push(response.url);
                //   }
                // }
                if (response.url) {
                    if (mainImageNames.includes(fileName)) {
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
                secondaryImages,
            }
            mutate(payload);
        }
    };
    useEffect(() => {
        if (isSuccess) {
            refetch();
            setIsSuccess(false); // Reset success state after refetching
        }
    }, [isSuccess, refetch]);
    const handleDelete = () => {
        deletionMutate();
        setIsSuccess(false);
        refetch();
    }
    return (
        <MaxWidthWrapper className="mt-24 w-full">
            <div className="w-full flex justify-center space-x-12 items-center">
                <div className="w-1/2 bg-gray-500 h-[500px]">
                    <form onSubmit={handleSubmit} className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
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
                </div>
                <div id="preview" className="w-1/2 flex flex-col justify-center items-center space-y-4">
                    <div className="w-full ">
                        <span className="w-full text-[18px] tracking-widest font-semibold">
                        {areProductsLoading ? (
                                    <>
                                        <span className="flex justify-center items-center space-x-2">
                                            <span>Preview</span>
                                            <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full flex justify-between items-center">
                                            <span>preview</span>
                                            <Trash2Icon onClick={handleDelete} className="cursor-pointer" />
                                        </div>
                                    </>
                                )}
                        </span>
                    </div>

                    {data?.products.length === 0 ? (
                        <div className="w-full grid grid-cols-2 gap-5">
                            <div className="w-full">
                            <div className="w-full flex justify-center items-center">
                                    <span className="text-[16px] tracking-widest">products</span>
                                </div>
                            </div>
                            <div className="w-full">
                            <div className="w-full flex justify-center items-center">
                                    <span className="text-[16px] tracking-widest">products</span>
                                </div>
                            </div>
                            <div className="w-full">
                            <div className="w-full flex justify-center items-center">
                                    <span className="text-[16px] tracking-widest">products</span>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-center items-center">
                                    <span className="text-[16px] tracking-widest">products</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="w-full grid grid-cols-2 gap-5">
                                <div className="w-full">
                                    <img className="w-full 1h-[200px]" src={data?.products[0].firstProduct} />
                                </div>
                                <div className="w-full">
                                    <img className="w-full h-[200px]" src={data?.products[0].secondProduct} />
                                </div>
                                <div className="w-full">
                                    <img className="w-full h-[200px]" src={data?.products[0].thirdProduct} />
                                </div>
                                <div className="w-full">
                                    <img className="w-full h-[200px]" src={data?.products[0].fourthProduct} />
                                </div>

                            </div>
                        )}

                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default ProductUpload;