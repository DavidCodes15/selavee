"use client"
import { useState } from "react";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";
import { Trash } from "lucide-react";
interface CategoryImages {
    bestSellers?: string;
    newIns?: string;
    necklaces?: string;
    bracelets?: string;
    rings?: string;
    earrings?: string;
    sales?: string;
    liked?: string;
}
const CategoryImages = () => {
    const { data: categories, isLoading, refetch } = trpc.product.fetchCateImages.useQuery<CategoryImages>();
    const { mutate: addImage } = trpc.product.addCategoryImage.useMutation({
        onSuccess: () => {
            toast.success("Image added successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to add image.");
        },
    });
    const { mutate: deleteImage } = trpc.product.deleteCategoryImage.useMutation({
        onSuccess: () => {
            toast.success("Image deleted successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to delete image.");
        },
    });

    const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

    const handleAdd = async (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setLoadingCategory(category);
            try {
                const response = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload",
                });
                if (response.url) {
                    addImage({ category, imageUrl: response.url });
                }
            } catch (err) {
                toast.error("Failed to upload image.");
            } finally {
                setLoadingCategory(null);
            }
        }
    };

    const handleDelete = (category: string) => {
        deleteImage({ category });
    };

    const categoryList = [
        { key: "bestSellers", label: "Best Sellers" },
        { key: "newIns", label: "New In" },
        { key: "necklaces", label: "Necklaces" },
        { key: "bracelets", label: "Bracelets" },
        { key: "rings", label: "Rings" },
        { key: "earrings", label: "Earrings" },
        { key: "sales", label: "Sales" },
        { key: "liked", label: "Liked" },
    ];
    return (
        <>
            <div className="rounded-xl bg-[#21222D] p-6 flex flex-col space-y-6 h-full text-white">
                <div className="text-white font-semibold">
                    <span className="text-[22px]">Category Images</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        categoryList.map(({ key, label }) => (
                            <div key={key} className="bg-[#171821] p-4 rounded-lg flex flex-col items-center space-y-4">
                                <span className="text-lg font-semibold">{label}</span>
                                {categories?.[key as keyof CategoryImages] ? (
                                    <div className="relative">
                                        <img
                                            src={categories[key as keyof CategoryImages]}
                                            alt={label}
                                            className="w-[200px] h-[150px] rounded-lg object-cover"
                                        />
                                        <button
                                            onClick={() => handleDelete(key)}
                                            className="absolute top-2 right-2"
                                        >
                                            <Trash color="red" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center space-y-2">
                                        <span>No image available</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleAdd(e, key)}
                                            disabled={loadingCategory === key}
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

        </>
    )
}

export default CategoryImages