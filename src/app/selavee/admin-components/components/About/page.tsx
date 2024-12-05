"use client";
import { trpc } from "@/app/trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Loader2, Trash2Icon, UploadCloudIcon } from "lucide-react";

import { upload } from "@vercel/blob/client";
const About = () => {
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [firstText, setFirstText] = useState("");
    const [secondText, setSecondText] = useState("");
    const [thirdText, setThirdText] = useState("");
    const [fourthText, setFourthText] = useState("");
    const [isHover, setIsHover] = useState(0);
    const handleInputChange = (
        setState: React.Dispatch<React.SetStateAction<string>>,
      ) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(event.target.value);
      };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImageFiles(Array.from(files)); // Store the files in state
        }
    };
    const { data, isLoading: areProductsLoading, refetch } = trpc.product.fetchAboutUsText.useQuery();
    const { mutate, isLoading } = trpc.product.createAboutUsText.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
            console.log(err);
        },
        onSuccess: () => {
            toast.success("upload was successfull.");
        },
    })
    const { mutate: deletionMutate, isLoading: isDeleting } = trpc.product.deleteAboutUsText.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {
            toast.success("deleted successfully.");
            // router.push("/selavee/admin");
            setIsSuccess(true);
        },
    });
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageFiles.length > 0) {
            const mainImages: { [key: string]: string } = {};
            // const secondaryImages: { [key: string]: string } = {};
            const secondaryImages: string[] = [];
            const mainImageNames = [
                "first-image",
                "second-image",
                "third-image",
                "fourth-image",
            ];
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const fileName = file.name.toLowerCase().replace(/\s+/g, "-").replace(/\.[^.]+$/, "");
                const response = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload",
                });

                if (response.url) {
                    if (mainImageNames.includes(fileName)) {
                        mainImages[fileName] = response.url;
                    } else {
                        secondaryImages.push(response.url);
                    }
                }
            }
            const payload = {
                firstText,
                secondText,
                thirdText,
                fourthText,
                firstProduct: mainImages["first-image"],
                secondProduct: mainImages["second-image"],
                thirdProduct: mainImages["third-image"],
                fourthProduct: mainImages["fourth-image"],
                secondaryImages,
            }
            mutate(payload);
        }
    }
    return (
        <MaxWidthWrapper className="mt-44">

            {data?.texts.length === 0 ? (
                <>
                    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center space-y-28">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-[18px] font-semibold tracking-widest">
                                About us
                            </h1>
                            <input

                                type="file"
                                id="mainImage"
                                name="mainImage"
                                className="flex cursor-pointer items-center justify-center pl-28"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                        </div>
                        <div
                            id="grid"
                            className="grid w-full grid-cols-1 sm:gap-x-0 sm:gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:gap-x-16 lg:gap-y-28 xl:gap-28"
                            style={{
                                display: "grid",
                                placeContent: "center",
                            }}
                        >

                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`w-fit transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 1 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    01
                                </span>

                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">

                                    <textarea value={firstText} onChange={handleInputChange(setFirstText)} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/>
                                </div>

                            </div>
                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 2 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    02
                                </span>
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">

                                    <textarea value={secondText} onChange={handleInputChange(setSecondText)}  cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/>
                                </div>
                            </div>
                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 3 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    03
                                </span>
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">

                                    <textarea value={thirdText} onChange={handleInputChange(setThirdText)} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/>
                                </div>

                            </div>
                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 4 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} z-0 sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    04
                                </span>
                                <div className="z-0 sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">

                                    <textarea value={fourthText} onChange={handleInputChange(setFourthText)} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/>
                                </div>

                            </div>

                        </div>
                        <button type="submit" className="w-full bg-black text-[16px] tracking-widest text-white py-4">
                            {/* Upload the about us */}
                            {isLoading ? (
                                <span className="flex justify-center items-center space-x-2">
                                    <span>uploading</span>
                                    <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
                                </span>
                            ) : (
                                <span>Upload the about us</span>
                            )}
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <div className="flex w-full flex-col items-center justify-center space-y-28">
                         <div className="flex w-full items-center justify-between">
                            <h1 className="text-[18px] font-semibold tracking-widest">
                                 About us
                             </h1>
                            
                             <Trash2Icon className="cursor-pointer" onClick={handleDelete} />
                       </div>
                   <div
                            id="grid"
                            className="grid w-full grid-cols-1 sm:gap-x-0 sm:gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:gap-x-16 lg:gap-y-28 xl:gap-28"
                            style={{
                                display: "grid",
                                placeContent: "center",
                            }}
                        >

                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`w-fit transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 1 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    01
                                </span>

                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                        {data?.texts[0].firstText}
                                    </p>
                                    {/* <textarea {...register("firstText")} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/> */}
                                </div>

                            </div>
                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 2 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    02
                                </span>
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                        {data?.texts[0].secondText}
                                    </p>
                                    {/* <textarea {...register("secondText")} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/> */}
                                </div>
                            </div>
                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 3 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    03
                                </span>
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                        {data?.texts[0].thirdText}
                                    </p>
                                    {/* <textarea {...register("thirdText")} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/> */}
                                </div>

                            </div>
                            <div

                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 4 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} z-0 sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    04
                                </span>
                                <div className="z-0 sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                        {data?.texts[0].fourthText}
                                    </p>
                                    {/* <textarea {...register("fourthText")} cols={5} rows={5} className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]" placeholder="Notre newsletter vous convie à un voyage exclusif dans
                                    l&apos;univers de notre joaillerie."/> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </MaxWidthWrapper>
    )
}

export default About