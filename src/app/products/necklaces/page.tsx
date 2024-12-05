"use client";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useCallback } from "react"
import debounce from "lodash.debounce"
import Link from "next/link";
import { ProductState } from "@/lib/validators/ProductFilterValidator";
import { trpc } from "@/app/trpc/client";
import { CheckIcon } from "lucide-react";
import Slider from "react-slider";
import { ProductFileValidator } from "@/lib/validators/ProductFileValidator";
type User = {
  _id: string;
  email?: string;
  [key: string]: any;
};
type CartProduct = Product & {
  selectedImageUrl: string;
  selectedColor: string;
  totalPrice: number;
  quantity: number;
};
import { ProductSize } from "@/project-types";
type Product = {

  _id: string;
  productCategory: string;
  productName: string;
  completeSet: string;
  otherCreations: string;
  productDetail: string;
  productStyleCode: string;
  productDimensions: string;
  productDiamondPurity: string;
  productDiamondGrossWeight: string;
  productDiamondPcs: string;
  productMetalPurity: string;
  productMetalGrossWeight: string;
  productStoneShape: string;
  productStoneType: string;
  mainProductImage: string;
  mainModelImage: string;
  pinkGold: string;
  yellowGold: string;
  silverGold: string;
  sizes: ProductSize[];
  onlyPrice: number;
  bought: number;
  sort: string;
  totalPrice: number;
  selectedImageUrl: string;
  selectedColor: string;
  secondaryImages?: string[];
  quantity: number; // Optional field

}
import { z } from "zod";
import { ProductFilterValidator } from '@/lib/validators/ProductFilterValidator';
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import { useRouter } from "next/router";
import Filter from "@/components/filter/page";
import { useLikedChange, useStateChange } from "@/hooks/use-state";
const METAL_FILTERS = {
  id: 'metal',
  name: 'Metal',
  options: [
    { value: 'white', label: 'White', selected: false },
    { value: 'rose', label: 'Rose', selected: false },
    { value: 'yellow', label: 'Yellow', selected: false },
  ]
}
const STYLE_FILTERS = {
  id: 'style',
  name: 'STYLE',
  options: [
    { value: 'pendant', label: 'Pendant' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'gemstone', label: 'Gemstone' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'drilled-diamond', label: 'Drilled Diamond' },
  ] as const,
}
const STONE_TYPE_FILTERS = {
  id: 'stone_type',
  name: 'STONE TYPE',
  options: [
    { value: 'diamond-stone', label: 'Diamond' },
    { value: 'emerald-stone', label: 'Emerald' },
    { value: 'ruby-stone', label: 'Ruby' },
    { value: 'blue-sapphires-stone', label: 'Blue Sapphires' },
    { value: 'pink-sapphires-stone', label: 'Pink Sapphires' },
  ],
} as const
const STONE_SHAPE_FILTERS = {
  id: 'stone_shape',
  name: 'STONE SHAPE',
  options: [
    { value: 'round', label: 'Round' },
    { value: 'oval', label: 'Oval' },
    { value: 'baguette', label: 'Baguette' },
    { value: 'emerald', label: 'Emerald' },
    { value: 'marquise', label: 'Marquise' },
    { value: 'heart', label: 'Heart' },
  ],
} as const
const CATEGORY_FILTERS = {
  id: 'category',
  name: "category",
  options: [
    { value: 'All', label: 'All', selected: false },
    {
      value: 'Necklaces', label: 'Necklaces', selected: true
    },
    { value: 'Bracelets', label: 'Bracelets', selected: false },
    { value: 'Rings', label: 'Rings', selected: false },
    { value: 'Earrings', label: 'Earrings', selected: false },

  ]
}
const SORT_OPTIONS = {
  id: 'sort',
  name: 'sort',
  options: [
    { value: 'best-sellers', label: 'Best Sellers', selected: true },
    { value: 'new-in', label: 'New Arrivals', selected: false },
    { value: 'price-desc', label: 'Price: High to Low', selected: false },
    { value: 'price-asc', label: 'Price: Low to High', selected: false },
  ]
}
const PRICE_FILTERS = {
  id: 'price',
  name: 'Price',
  options: [
    { value: [0, 100], label: 'Any price' },
    {
      value: [0, 20],
      label: 'Under 20$',
    },
    {
      value: [0, 40],
      label: 'Under 40$',
    },
    // custom option defined in JSX
  ],
} as const
interface PageProps {
  searchParams: {
    [key: string]: string
  }
}
const DEFAULT_CUSTOM_PRICE = [0, 300] as [number, number]
const Necklaces = ({ searchParams }: PageProps) => {
  const providedStyle = searchParams.style;

  const { data, isLoading: categoryLoading } = trpc.product.fetchCategoryImages.useQuery();
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const [sortByClicked, setSortByClicked] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  // const [selectedColor, setSelectedColor] = useState('mainProductImage');
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const handleColorClick = (productId: string, color: string) => {
    // Update the selected color for a specific product
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };
  // let defaultPrice;
  // if (data?.specificProduct.sizes.length > 0) {
  //   defaultPrice = data?.specificProduct.sizes[0].price;
  //   defaultSize = data?.specificProduct.sizes[0].size;
  // } else {
  //   defaultPrice = data?.specificProduct.onlyPrice;
  //   defaultSize = null;
  // }
  // const handleColorClick = (color: string) => {
  //   setSelectedColor(color);
  // };
  const [filter, setFilter] = useState<ProductState>({
    category: ["Necklaces"],
    style: [],
    metal: [],
    stone_type: [],
    stone_shape: [],
    price: { isCustom: true, range: DEFAULT_CUSTOM_PRICE },
    sort: ["best-sellers"],
  })


  useEffect(() => {

    if (providedStyle) {
      setFilter((prev) => ({
        ...prev,
        style: [providedStyle as z.infer<typeof ProductFilterValidator>['style'][0]],
      }));
    }
  }, []);



  const { data: products, refetch, isLoading } = trpc.product.filteredProducts.useQuery({
    category: filter.category,
    style: filter.style,
    metal: filter.metal,
    stone_type: filter.stone_type,
    stone_shape: filter.stone_shape,
    price: filter.price.range,
    sort: filter.sort,

  })
  console.log(products);
  console.log(filter.category);

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, 'price'>
    value: string

  }) => {
    if (category === 'category') {
      const newOptions = CATEGORY_FILTERS.options.map((opt) => {
        if (opt.value === value) {
          return { ...opt, selected: true };
        }
        return { ...opt, selected: false };
      });
      CATEGORY_FILTERS.options = newOptions;
      setFilter((prev) => ({
        ...prev,
        category: [value as "All" | "Necklaces" | "Bracelets" | "Rings" | "Earrings"],
      }));

    } else if (category === "sort") {
      const newOptions = SORT_OPTIONS.options.map((opt) => {
        if (opt.value === value) {
          return { ...opt, selected: true };
        }
        return { ...opt, selected: false };

      })
      SORT_OPTIONS.options = newOptions;
      setFilter((prev) => ({
        ...prev,
        sort: [value as "best-sellers" | "new-in" | 'price-asc' | "price-desc"],
      }));
    }
    else {
      const isFilterApplied = (filter[category] as string[]).includes(value as never)

      if (isFilterApplied) {
        setFilter((prev) => ({
          ...prev,
          [category]: (prev[category] as string[]).filter((v: string) => v !== value),
        }))
      } else {
        setFilter((prev) => ({
          ...prev,
          [category]: [...prev[category], value],
        }))
      }
      const newOptions = METAL_FILTERS.options.map((option) => {
        if (option.value === value) {
          return { ...option, selected: isFilterApplied ? false : true }
        }
        return option
      })
      METAL_FILTERS.options = newOptions;
    }
  }
  const minPrice = Math.min(filter.price.range[0], filter.price.range[1])
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1])
  const [values, setValues] = useState([minPrice, maxPrice]);
  const handlePriceChange = (newValues: number[]) => {
    const priceRange: [number, number] = [newValues[0], newValues[1]]; // Ensure it's a tuple
    setValues(priceRange);
    setFilter((prev) => ({
      ...prev,
      price: { ...prev.price, range: priceRange }
    }));
    debouncedSubmit();
  };
  const [user, setUser] = useState<User | "not authorized" | null>(null);
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
  const { items: likedItems, addItem: addLikedItem, removeItem: removeLikedItem } = useLikedChange();


  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const onSubmit = () => refetch()
  const debouncedSubmit = debounce(onSubmit, 400)
  const _debouncedSubmit = useCallback(debouncedSubmit, [])
  products?.filteredProducts.map((product) => {
    console.log(product, "product");
  });
  const handleLike = (product: Product) => {
    if (user && typeof user !== "string") {
      const selectedColor = selectedColors[product._id] || "mainProductImage";
      const imageMap: Record<string, string | undefined> = {
        mainProductImage: product.mainProductImage,
        pinkGold: product.pinkGold,
        yellowGold: product.yellowGold,
        silverGold: product.silverGold,
      };

      // Get the correct image based on selectedColor

      // const selectedImageUrl = imageMap[selectedColor] || product.mainProductImage;
      const selectedImageUrl = imageMap[selectedColor] || product.mainProductImage;
      const likedProduct: CartProduct = {
        ...product,
        _id: product._id,
        productName: product.productName,
        selectedImageUrl: selectedImageUrl || "",
        selectedColor,
        totalPrice: product.sizes?.[0]?.price || product.onlyPrice || 0,
        quantity: 1, // Default to 1, or adjust as needed
      };

      addLikedItem(likedProduct); // Add the product to liked items
      toast.success(`${product.productName} has been added to your favorites!`);
    } else {
      toast.error("You need to log in to like a product.");
    }
  }
  return (

    <>
      {/**px-4 pl-4 top-32 */}
      {/* <Filter /> */}
      <div id="menu" className={`bg-white fixed top-32 overflow-y-scroll z-100 flex h-[88%] flex-col items-start sm:w-screen md:w-fit ${isToggleMenu ? 'filter active' : 'filter'}`}>
        <div className="w-full flex flex-col items-start justify-center space-y-12">

          <div className="relative w-full px-8 pt-12 flex flex-col justify-center items-start space-y-4">
            <div className="w-full flex justify-between items-center mt-2">
              <span className="text-[20px] tracking-widest font-bold">FILTER</span>
              <button
                className={`hamburger flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0 open`}
                onClick={() => setIsToggleMenu(!isToggleMenu)}
              >
                <span
                  className="hamburger-top absolute left-0 top-5 h-[2px] w-10 bg-black"

                ></span>
                <span
                  className="hamburger-bottom absolute left-0 top-5 h-[2px] w-10 bg-black"

                ></span>
              </button>
            </div>
            <div className="w-full flex flex-col justify-center items-start space-y-6">
              <span className="text-[14px] tracking-widest font-semibold">PRICE</span>
              <Slider className="filterSlider" onChange={handlePriceChange} value={values} min={0} max={300} minDistance={50} step={50} />
              <div className="flex justify-between w-full mt-2">
                <span>{values[0].toLocaleString()} $</span>
                <span>{values[1].toLocaleString()} $</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start space-y-12">

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
              <span className="text-[14px] font-semibold tracking-widest">STYLE</span>
              <form className="flex flex-col justify-center items-start space-y-2">
                {STYLE_FILTERS.options.map((option) => (
                  <span key={option.value} className="flex justify-start items-center space-x-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={filter.style.includes(option.value)}
                      onChange={() =>
                        applyArrayFilter({
                          category: 'style',
                          value: option.value,
                        })
                      }
                    />
                    <label className="cursor-pointer tracking-widest text-[14px]">{option.label}</label>
                  </span>
                ))}
              </form>
            </div>

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
              <span className="text-[14px] tracking-widest font-semibold">METAL</span>
              <div className="flex flex-col justify-center items-start space-y-2">
                {METAL_FILTERS.options.map((option) => (
                  <div key={option.value} className="flex justify-start items-center space-x-2">
                    <span onClick={() =>
                      applyArrayFilter({
                        category: 'metal',
                        value: option.value,
                      })
                    } className={`w-[20px] h-[20px] cursor-pointer rounded-full ${option.value === 'white' ? 'silver-gradient' :
                      option.value === 'yellow' ? 'gold-gradient' :
                        option.value === 'rose' ? 'pink-gradient' : ''

                      } ${option.selected ? 'border border-gray-500' : ''}`} />
                    <span className="text-[14px] tracking-widest">18K {option.label} Gold</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
              <span className="text-[14px] font-semibold tracking-widest">STONE TYPE</span>
              <form className="flex flex-col justify-center items-start space-y-2">
                {STONE_TYPE_FILTERS.options.map((option) => (
                  <span key={option.value} className="flex justify-start items-center space-x-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={filter.stone_type.includes(option.value)}
                      onChange={() =>
                        applyArrayFilter({
                          category: 'stone_type',
                          value: option.value,
                        })
                      }
                    />
                    <label className="cursor-pointer tracking-widest text-[14px]">{option.label}</label>
                  </span>
                ))}
              </form>
            </div>

            <div className="flex flex-col justify-center items-start space-y-6 w-full">
              <div className="flex flex-col justify-start items-center space-y-2">
                <span className="text-[14px] tracking-widest font-semibold ml-8">STONE SHAPE</span>
                <div className="flex flex-col justify-start items-start space-y-2 ml-6">
                  {STONE_SHAPE_FILTERS.options.map((option) => (
                    <span key={option.value} className="flex justify-start items-center space-x-2">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        checked={filter.stone_shape.includes(option.value)}
                        onChange={() =>
                          applyArrayFilter({
                            category: 'stone_shape',
                            value: option.value,
                          })
                        }
                      />
                      <label className="cursor-pointer tracking-widest text-[14px]">{option.label}</label>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-start items-center space-y-2">
                <span className="text-[14px] tracking-widest font-semibold ml-8">STONE SHAPE</span>
                <div className="flex flex-col justify-start items-start space-y-2 ml-6">
                  {STONE_SHAPE_FILTERS.options.map((option) => (
                    <span key={option.value} className="flex justify-start items-center space-x-2">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        checked={filter.stone_shape.includes(option.value)}
                        onChange={() =>
                          applyArrayFilter({
                            category: 'stone_shape',
                            value: option.value,
                          })
                        }
                      />
                      <label className="cursor-pointer tracking-widest text-[14px]">{option.label}</label>
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <button className="w-full text-black text-[16px] tracking-widest text-center py-2 font-semibold bg-white">CLEAR</button>
                <button onClick={() => setIsToggleMenu(!isToggleMenu)} className="w-full bg-black text-white text-[16px] tracking-widest text-center py-2 font-semibold">FILTER</button>
              </div>
            </div>

          </div>

        </div>
      </div >
      <MaxWidthWrapper className="mt-52 mb-80">
        <section id="hero" className="w-full">
          <div className="flex flex-col space-y-24">
            <div className="flex items-center justify-center">
              <h1 className="text-[18px] lg:text-[24px] font-semibold tracking-widest">
                Necklaces
              </h1>
            </div>
            {/* bg-[#FEFCFE] */}
            <div className="flex flex-col-reverse lg:flex-row w-full justify-center px-4 lg:px-0">
              <div className="flex flex-1 items-end justify-center lg:justify-start">
                <p className="w-full lg:max-w-[338.31px] text-[14px] leading-7 tracking-widest">
                  Notre newsletter vous convie à un voyage exclusif dans
                  l&apos;univers de notre joaillerie.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-w-1/3">
                {categoryLoading ? (
                  <></>
                ) : (
                  <>
                    {data?.products.length === 0 ? (
                      null
                    ) : (
                      <img className="h-[293px]" src={data?.products[0].necklaces} />
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-1 items-start justify-end">
                <p className="max-w-md text-[14px] tracking-widest text-gray-700">
                  Notre newsletter
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className=" -full mt-44">

          <div className="flex flex-col space-y-24">
            <div className="flex items-center justify-center">
              <h2 className="text-[18px] md:text-[24px] font-semibold tracking-widest">
                Products
              </h2>
            </div>
            <div className="z-50 flex w-full justify-center px-2 md:px-0">
              <div className="flex flex-1 items-center justify-start">
                <div onClick={() => setIsToggleMenu(!isToggleMenu)} className="flex justify-center items-center space-x-2 cursor-pointer">
                  <div>
                    <img src="/icons/filter.svg" />
                  </div>
                  <span className="text-[16px]">Filter</span>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div>
                  <ul className="flex justify-center items-center space-x-4 tracking-widest text-[16px] text-[#666666]">
                    {CATEGORY_FILTERS.options.map((option) => (
                      <li key={option.value} className={`cursor-pointer hover:text-black pb-2 ${option.selected ? 'border-b-2 border-black' : ''}`} onClick={() => {
                        const newOptions = CATEGORY_FILTERS.options.map((opt) => {
                          if (opt.value === option.value) {
                            return { ...opt, selected: true };
                          }
                          return { ...opt, selected: false };
                        });
                        CATEGORY_FILTERS.options = newOptions;
                        applyArrayFilter({
                          category: 'category',
                          value: option.value,
                        });
                      }}>{option.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="icon-wrapper flex flex-1 items-center justify-end relative">
                <div onClick={() => setSortByClicked(!sortByClicked)} className="icon flex justify-center items-center space-x-2 cursor-pointer">
                  <div>
                    <img src="/icons/sort-by.svg" />
                  </div>
                  <span className="text-[16px]">Sort By</span>
                </div>
                {sortByClicked && (
                  <div className="absolute -right-[10px] sm:-bottom-[200px] lsm:-bottom-[150px]">
                    {SORT_OPTIONS.options.map((option) => (
                      <div key={option.value} className="w-full bg-black flex flex-col justify-center items-start space-y-4 pl-2 lsm:pr-4 md:pr-8 lg:pr-8 xl:pr-12 py-2">
                        <span onClick={() => {
                          const newOptions = SORT_OPTIONS.options.map((opt) => {
                            if (opt.value === option.value) {
                              return { ...opt, selected: true };
                            }
                            return { ...opt, selected: false };
                          });
                          SORT_OPTIONS.options = newOptions;
                          applyArrayFilter({
                            category: 'sort',
                            value: option.value,
                          });
                          setSortByClicked(!sortByClicked)
                        }
                        } className="text-white text-[14px] tracking-widest cursor-pointer w-full flex justify-between items-center">
                          <span>{option.label}</span>
                          {option.selected && (
                            <span><CheckIcon /></span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}


              </div>
            </div>
          </div>
          {isLoading ? (
            <>
              <ProductSkeleton />
            </>
          ) : (
            <>
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-5">
                {products?.filteredProducts.length === 0 ? (
                  <>
                    <div className="w-full h-[500px] bg-transparent">

                    </div>
                    <div className="w-full h-[500px] bg-transparent flex justify-center items-center">
                      <h2 className="text-[18px] tracking-widest">No products in the store yet</h2>
                    </div>
                    <div className="w-full h-[500px] bg-transparent">

                    </div>
                  </>
                ) : (
                  <>
                    {products?.filteredProducts.map((product) => {
                      const isLiked = likedItems.some((likedItem) => likedItem.product._id === product._id);
                      console.log("product", product);
                      console.log("isliked", isLiked);
                      return (
                        <div key={product._id} className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                          <div className="relative sm:w-full sm:mx-auto md:w-full">
                            <Link href={`/products/product?id=${product._id}`}>
                              <img src={
                                selectedColors[product._id] === "pinkGold"
                                  ? product.pinkGold
                                  : selectedColors[product._id] === "yellowGold"
                                    ? product.yellowGold
                                    : selectedColors[product._id] === "silverGold"
                                      ? product.silverGold
                                      : product.mainProductImage
                              } className="xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0" />

                              <img src={product.mainModelImage} className="z-10 absolute top-0 left-0 xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100" />
                            </Link>
                            <button
                              className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[14px] px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              
                            >
                              Add to Bag
                            </button>
                          </div>
                          <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                            <div className="w-full flex justify-between items-center">
                              <span className="tracking-widest text-[18px]">{product.productName}</span>
                              <span className="icon-wrapper">

                                {isLiked ? (
                                  <img
                                    src="/icons/active-heart.svg"
                                    className="icon sm:h-[20px] sm:w-[20px] msm:h-[24px] msm:w-[24px] cursor-pointer"

                                    onClick={() => removeLikedItem(product._id)}
                                  />
                                ) : (
                                  <img
                                    src="/icons/heart.svg"
                                    className="icon sm:h-[20px] sm:w-[20px] msm:h-[24px] msm:w-[24px] cursor-pointer"
                                    style={{ filter: "invert(1)" }}
                                    onClick={() => handleLike(product as Product)}
                                  />
                                )}
                              </span>
                            </div>
                            <div className="flex justify-center items-center space-x-2">

                              <span
                                onClick={() => handleColorClick(product._id, "pinkGold")}
                                className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColors[product._id] === "pinkGold"
                                  ? "border-[1px] border-solid border-black"
                                  : ""
                                  }`}
                              />
                              <span
                                onClick={() => handleColorClick(product._id, "yellowGold")}
                                className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColors[product._id] === "yellowGold"
                                  ? "border-[1px] border-solid border-black"
                                  : ""
                                  }`}
                              />
                              <span
                                onClick={() => handleColorClick(product._id, "silverGold")}
                                className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColors[product._id] === "silverGold"
                                  ? "border-[1px] border-solid border-black"
                                  : ""
                                  }`}
                              />
                            </div>
                            <div>


                              <span className="font-bold text-[14px]">{product.sizes[0].price} $</span>


                            </div>
                          </div>

                        </div>
                      )
                    })}

                  </>
                )}

              </div>
            </>
          )}

          <div className="mt-24 flex justify-center items-center">
            <div className="flex justify-center items-center space-x-6">
              <span className="text-[16px] text-[#666666] cursor-pointer">1</span>
              <span className="bg-[#666666] h-[1px] w-[63px]" />
              <span className="text-black font-semibold text-[16px] cursor-pointer">2</span>
              <span className="text-[16px] text-[#666666] cursor-pointer">3</span>
              <span className="text-[16px] text-[#666666] cursor-pointer">4</span>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  )
};

export default Necklaces;
