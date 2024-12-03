"use client";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Loader2, Trash2Icon, UploadCloudIcon } from "lucide-react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { upload } from "@vercel/blob/client";
import "react-quill/dist/quill.snow.css";
const About = () => {
    const [firstImage, setFirstImage] = useState<File | null>(null);
    const [secondImage, setSecondImage] = useState<File | null>(null);
    const [thirdImage, setThirdImage] = useState<File | null>(null);
    const [fourthImage, setFourthImage] = useState<File | null>(null);
    const handleImageChange = (setImageState: React.Dispatch<React.SetStateAction<File | null>>) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageState(file);
        }
    };
    const [firstText, setFirstText] = useState("");
    const [secondText, setSecondText] = useState("");
    const [thirdText, setThirdText] = useState("");
    const [fourthText, setFourthText] = useState("");
    const [loading, setLoading] = useState(false); // For upload button
    // const { data, refetch } = trpc.product.fetchAboutUsText.useQuery();
    const { data, isLoading: isFetching, refetch } = trpc.product.fetchAboutUsText.useQuery();
    const { mutate } = trpc.product.createAboutUsText.useMutation({
        onSuccess: () => {
            toast.success("Text uploaded successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to upload text.");
        },
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const imageUploads: { [key: string]: string } = {};
        const images = [firstImage, secondImage, thirdImage, fourthImage];
        const imageNames = ["firstImage", "secondImage", "thirdImage", "fourthImage"];

        // Upload images
        for (let i = 0; i < images.length; i++) {
            if (images[i]) {
                const response = await upload(images[i]!.name, images[i]!, {
                    access: "public",
                    handleUploadUrl: "/api/upload", // Adjust if needed
                });
                if (response.url) {
                    imageUploads[imageNames[i]] = response.url;
                }
            }
        }

        // Create payload
        const payload = {
            firstText,
            secondText,
            thirdText,
            fourthText,
            firstProduct: imageUploads.firstImage || "",
            secondProduct: imageUploads.secondImage || "",
            thirdProduct: imageUploads.thirdImage || "",
            fourthProduct: imageUploads.fourthImage || "",
        };

        mutate(payload);
    };
    const { mutate: deletionMutate, isLoading: isDeleting } = trpc.product.deleteAboutUsText.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {
            toast.success("deleted successfully.");
            // router.push("/selavee/admin");
            
        },
    });
    const handleDelete = () => {
        deletionMutate();
        refetch();
    }
    return (
        <>
            <div className="rounded-xl bg-[#21222D] p-6 flex flex-col space-y-6 h-full text-white">
                <div className="text-white font-semibold">
                    <span className="text-[22px]">About</span>
                </div>
                {isFetching ? (
                    <div className="text-center text-white">Loading...</div>
                ) : data?.texts.length !== 0 ? (
                    <div className="bg-[#171821] rounded-xl p-6 flex flex-col justify-start items-center space-y-6">
                        <div className="flex flex-col justify-center items-start w-full space-y-4">
                            <h2 className="text-[18px] font-semibold">Existing Content</h2>

                            {/* Display Section 1 */}
                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3>Section 1</h3>
                                    <p dangerouslySetInnerHTML={{ __html: data?.texts[0].firstText }} />
                                    <img
                                        src={data?.texts[0].firstProduct}
                                        alt="Section 1"
                                        className="h-40 w-40 object-cover"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3>Section 2</h3>
                                    <p dangerouslySetInnerHTML={{ __html: data?.texts[0].secondText }} />
                                    <img
                                        src={data?.texts[0].secondProduct}
                                        alt="Section 1"
                                        className="h-40 w-40 object-cover"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3>Section 3</h3>
                                    <p dangerouslySetInnerHTML={{ __html: data?.texts[0].thirdText }} />
                                    <img
                                        src={data?.texts[0].thirdProduct}
                                        alt="Section 1"
                                        className="h-40 w-40 object-cover"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3>Section 4</h3>
                                    <p dangerouslySetInnerHTML={{ __html: data?.texts[0].fourthText }} />
                                    <img
                                        src={data?.texts[0].fourthProduct}
                                        alt="Section 1"
                                        className="h-40 w-40 object-cover"
                                    />
                                </div>
                            </div>
                            

                            
                            <button
                                className="bg-red-600 px-4 py-2 text-white rounded-lg"
                                onClick={handleDelete}
                            >
                                <Trash2Icon className="inline-block mr-2" /> Delete About Us
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-[#171821] rounded-xl p-6 flex flex-col justify-start items-center space-y-24">
                        {/* First Text */}
                        <div className="w-full grid grid-cols-2 gap-6 gap-y-12">
                            <div className="flex flex-col justify-center items-start space-y-4">
                                <label className="text-white">Section 1:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange(setFirstImage)}
                                    className="text-white mt-2"
                                />
                                <ReactQuill
                                    className="min-h-[250px] w-full custom"
                                    theme="snow"
                                    value={firstText}
                                    onChange={setFirstText}
                                    placeholder="Enter text for the first section..."
                                />

                            </div>

                            {/* Second Text */}
                            <div className="flex flex-col justify-center items-start space-y-4">
                                <label className="text-white">Section 2:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange(setSecondImage)}
                                    className="text-white mt-2"
                                />
                                <ReactQuill
                                    className="min-h-[250px] w-full custom"
                                    theme="snow"
                                    value={secondText}
                                    onChange={setSecondText}
                                    placeholder="Enter text for the second section..."
                                />
                            </div>

                            {/* Third Text */}
                            <div className="flex flex-col justify-center items-start space-y-4">
                                <label className="text-white">Section 3:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange(setThirdImage)}
                                    className="text-white mt-2"
                                />
                                <ReactQuill
                                    className="min-h-[250px] w-full custom"
                                    theme="snow"
                                    value={thirdText}
                                    onChange={setThirdText}
                                    placeholder="Enter text for the third section..."
                                />
                            </div>

                            {/* Fourth Text */}
                            <div className="flex flex-col justify-center items-start space-y-4">
                                <label className="text-white">Section 4:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange(setFourthImage)}
                                    className="text-white mt-2"
                                />
                                <ReactQuill
                                    className="min-h-[250px] w-full custom"
                                    theme="snow"
                                    value={fourthText}
                                    onChange={setFourthText}
                                    placeholder="Enter text for the fourth section..."
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-black text-[16px] tracking-widest text-white py-4"
                        >
                            {loading ? (
                                <span className="flex justify-center items-center space-x-2">
                                    <span>Uploading...</span>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                </span>
                            ) : (
                                <span>Upload Text</span>
                            )}
                        </button>
                    </form>
                )}

            </div>
        </>
    )
}


export default About;