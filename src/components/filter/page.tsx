"use client";

import { useState, useEffect, useCallback } from "react"
import debounce from "lodash.debounce"
import { trpc } from "@/app/trpc/client";
import { ProductState } from "@/lib/validators/ProductFilterValidator";
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
import Slider from "react-slider"
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
const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number]
const Filter = () => {
    const [isToggleMenu, setIsToggleMenu] = useState(false);
    const [filter, setFilter] = useState<ProductState>({
        category: ["Necklaces"],
        style: [],
        metal: [],
        stone_type: [],
        stone_shape: [],
        price: { isCustom: true, range: DEFAULT_CUSTOM_PRICE },
        sort: ["best-sellers"],
    })
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

    const onSubmit = () => refetch()
    const debouncedSubmit = debounce(onSubmit, 400)
    const _debouncedSubmit = useCallback(debouncedSubmit, [])
    return (
        <>
            <div id="menu" className={`bg-white fixed overflow-y-scroll z-100 flex h-screen flex-col items-start sm:w-screen md:w-fit ${isToggleMenu ? 'filter active' : 'filter'}`}>
                <div className="w-full flex flex-col items-start justify-center space-y-12">

                    <div className="relative w-full px-8 pt-12 flex flex-col justify-center items-start space-y-4">
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
                            <Slider className="filterSlider" onChange={handlePriceChange} value={values} min={0} max={100000} minDistance={30000} step={1000} />
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
            </div>
        </>
    )
}

export default Filter