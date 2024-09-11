"use client";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductState } from "@/lib/validators/ProductFilterValidator";
import { trpc } from "@/app/trpc/client";
const SORT_OPTIONS = [
  { name: 'Best Sellers', value: 'best-sellers' },
  { name: 'New Arrivals', value: 'new-in' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
] as const
const METAL_FILTERS = {
  id: 'metal',
  name: 'Metal',
  options: [
    { value: 'white', label: 'White' },
    { value: 'rose', label: 'Rose' },
    { value: 'yellow', label: 'Yellow' },
  ] as const,
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
    {value: 'All', label: 'All'},
    {value: 'Necklaces', label: 'Necklaces'},
    {value: 'Bracelets', label: 'Bracelets'},
    {value: 'Rings', label: 'Rings'},
    {value: 'Earrings', label: 'Earrings'},

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
const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number]
const Necklaces = () => {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const [sortByClicked, setSortByClicked] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('mainProductImage');

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };
  const [filter, setFilter] = useState<ProductState>({
    category: ["Earrings"],
    style: ['pendant', 'diamond', 'gemstone', 'tennis', 'drilled-diamond'],
    metal: ['white', 'rose', 'yellow'],
    stone_type: ['diamond-stone', 'emerald-stone', 'ruby-stone', 'blue-sapphires-stone', 'pink-sapphires-stone'],
    stone_shape: ['round', 'oval', 'pear', 'baguette', 'emerald', 'marquise', 'heart'],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    sort: 'best-sellers',
  })



  const { data: products, refetch } = trpc.product.filteredProducts.useQuery({
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
    category: keyof Omit<typeof filter, 'price' | 'sort'>
    value: string
  }) => {
    const isFilterApplied = (filter[category] as string[]).includes(value as never)

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        // [category]: prev[category].filter((v) => v !== value),
        [category]: (prev[category] as string[]).filter((v: string) => v !== value),
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }))
    }

  }
  useEffect(() => {
    refetch();
  }, [filter, refetch]);
  const minPrice = Math.min(filter.price.range[0], filter.price.range[1])
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1])
  return (

    <>
      {/**px-4 pl-4 */}
      <div id="menu" className={`bg-white fixed overflow-y-scroll top-0 z-10 flex h-screen flex-col items-start sm:w-screen md:w-fit ${isToggleMenu ? 'filter active' : 'filter'}`}>
        <div className="w-full flex flex-col items-start justify-center space-y-12">

          <div className="w-full px-8 pt-12 flex flex-col justify-center items-start space-y-4">
            <div className="w-full flex justify-between items-center">
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
            <div className="w-full flex flex-col justify-center items-start">
              <span className="text-[14px] tracking-widest font-semibold">PRICE</span>
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
                      } className={`w-[20px] h-[20px] cursor-pointer rounded-full silver-gradient`} />
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
              <div className="w-full flex flex-col justify-center items-center">
                <button className="w-full text-black text-[16px] tracking-widest text-center py-2 font-semibold">CLEAR</button>
                <button onClick={() => setIsToggleMenu(!isToggleMenu)} className="w-full bg-black text-white text-[16px] tracking-widest text-center py-2 font-semibold">FILTER</button>
              </div>
            </div>

          </div>

        </div>
      </div>
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
                <img src="/products/product.svg" />
              </div>
              <div className="flex flex-1 items-start justify-end">
                <p className="max-w-md text-[14px] tracking-widest text-gray-700">
                  Notre newsletter
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="w-full mt-44">

          <div className="flex flex-col space-y-24">
            <div className="flex items-center justify-center">
              <h2 className="text-[18px] md:text-[24px] font-semibold tracking-widest">
                Products
              </h2>
            </div>
            <div className="flex w-full justify-center px-2 md:px-0">
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
                      <li onChange={() =>
                        applyArrayFilter({
                          category: 'category',
                          value: option.value,
                        })
                      } key={option.value} className="cursor-pointer hover:text-black">{option.label}</li>
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
                    <div className="bg-black flex flex-col justify-center items-start space-y-4 pl-2 lsm:pr-4 md:pr-8 lg:pr-8 xl:pr-12 py-2">
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">Best Sellers</span>
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">New Arrivals</span>
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">Price:Low to High</span>
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">Price:High to Low</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
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
                  {products?.filteredProducts.map((product) => (
                    <div onMouseEnter={() => setHoveredProductId(product._id)}
                      onMouseLeave={() => setHoveredProductId(null)} key={product._id} className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                      <div className="relative sm:w-full sm:mx-auto md:w-full">
                        <Link href={`/products/product?id=${product._id}`}>
                          <img src={selectedColor === 'pinkGold'
                            ? product.pinkGold
                            : selectedColor === 'yellowGold'
                              ? product.yellowGold
                              : selectedColor === 'silverGold'
                                ? product.silverGold
                                : product.mainProductImage} className="xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0" />
                          <img src={product.mainModelImage} className="absolute top-0 left-0 xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100" />
                        </Link>
                      </div>
                      <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                        <div className="w-full flex justify-between items-center">
                          <span className="tracking-widest text-[18px]">{product.productName}</span>
                          <span className="icon-wrapper">
                              <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{ filter: 'invert(1)' }} />
                            
                          </span>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                          <span onClick={() => handleColorClick('pinkGold')} className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColor === "pinkGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                          <span onClick={() => handleColorClick('yellowGold')} className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColor === "yellowGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                          <span onClick={() => handleColorClick('silverGold')} className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColor === "silverGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                        </div>
                        <div>
                          <span className="font-bold text-[14px]">{product.sizes[0].price} $</span>
                        </div>
                      </div>
                    </div>

                  ))}
                </>
              )}

          </div>
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
