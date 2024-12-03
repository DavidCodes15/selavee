"use client";
import { useState, useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
interface NavbarProps {
  theme: "light" | "dark";
}
import { trpc } from "@/app/trpc/client";
import { getAuthUser } from "@/server/get-auth-user";
import Modal from "./Modal";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import UserAccountNav from "./UserAccountNav";
import Bag from "./dropdown/Bag";
import LikedProducts from "./dropdown/LikedProducts";
import { Trash } from "lucide-react";
import { useLikedChange, useStateChange, userStateChange } from "@/hooks/use-state";
import { toast } from "sonner";
import LogIn from "./authHandle/log-in/page";
import Register from "./authHandle/register/page";
type User = {
  _id: string;
  email?: string;
  [key: string]: any;
};
type StateUser = {
  _id: string;
  email: string;
  phone: number;
  firstName: string;
  lastName: string;
}
const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const [isToggle, setIsToggle] = useState(false);

  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);
  const pathname = usePathname();
  const [bagDropdown, setBagDropdown] = useState(false);
  const [user, setUser] = useState<User | "not authorized" | null>(null);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    // Reset the state of the hamburger menu when the page changes
    setIsToggle(false);
    setOpenMenuItem(null);
  }, [pathname]);
  const handleClick = () => {
    setFetched(!fetched);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = (await getAuthUser({
          shouldRedirect: false,
        })) as unknown as User;
        if (user && typeof user !== "string") {
          setUser(user);
        } else {
          setUser("not authorized");
        }
      } catch (error) {
        setUser("not authorized");
      }
    };

    fetchUser();
  }, [fetched])

  const handleMenuItemClick = (menuItem: "necklaces" | "bracelets" | "rings" | "earrings") => {
    if (openMenuItem === menuItem) {
      setOpenMenuItem(null);
    } else {
      setOpenMenuItem(menuItem);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // router.refresh();
  };

  const iconColor = theme === "dark" && !isToggle ? "black" : "white";
  const { items, removeItem } = useStateChange()
  const { items: users, addItem: addUser, removeItem: removeUser, clear: clearUser } = userStateChange();
  const { items: likedItems, removeItem: removeLikedItem } = useLikedChange();
  const itemCount = items.length;
  console.log(itemCount, "bag product count");
 
  const userCount = users.length;
  console.log(userCount, "user count");
  const likedCount = likedItems.length;
  const handleUserAdd = (user: StateUser) => {
    addUser(user);
  };

  const handleUserRemove = (userId: string) => {
    removeUser(userId);
  };

  const handleClearUsers = () => {
    clearUser();
  };
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const productIDs = items.map(({ product }) => product._id)
  console.log("productIds", productIDs)
  const cartTotal = items.reduce(
    (total, { product }) => total + product.totalPrice,
    0
  )
  const likedTotal = likedItems.reduce(
    (total, { product }) => total + product.sizes[0].price,
    0
  )

  const { data } = trpc.product.checkTheBag.useQuery(
    user && typeof user !== "string" ? { userId: user._id } : undefined as never,
    {
      enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
      onSuccess: (data) => {
        console.log("bag: ", data);
      },
      onError: (err) => {
        console.error("Error fetching the bag: ", err);
      },
    }
  );
  const { data: likedData, isLoading } = trpc.product.checkLikedProduct.useQuery(
    user && typeof user !== "string" ? { userId: user._id } : undefined as never,
    {
      enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
      onSuccess: (data) => {
        console.log("liked products: ", data);
      },
      onError: (err) => {
        console.error("liked products: ", err);
      },
    }
  );
  const { mutate, isLoading: isDeleting } = trpc.product.deleteBagItem.useMutation({
    onError: (err) => {
      toast.error("something went wrong");
      console.log("err", err);
    },
    onSuccess: () => {
      toast.success("successfully removed");
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const productIds = likedData?.likedProducts.map((likedProduct) => likedProduct.productId) || [];

  // Step 3: Use a single useQuery to fetch all the products based on those productIds
  const { data: productsData, isLoading: isProductsLoading } = trpc.product.fetchProductsByIds.useQuery(
    { productIds }, // Using the new endpoint
    {
      enabled: productIds.length > 0,
    }
  );
  const [userDropdown, setUserDropdown] = useState(false);
  const [likedDropdown, setLikedDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleDelete = (id: string) => {
    removeItem(id);
    // console.log("mutating");
    // console.log("id", id)
    // mutate({ id });
  }
  const handleLikedDelete = (id: string) => {
    removeLikedItem(id);
  }
  const { mutate: logOut, isLoading: loggingOut } = trpc.auth.logOut.useMutation({
    onError: (err) => {
      toast.error("Couldn't log out. There was some problem.");
    },
    onSuccess: () => {
      toast.success("logged out successfully.");
      setIsLoggingOut(false);
      clearUser();
    },
  });
  const [selectedButton, setSelectedButton] = useState("log-in");
  const handleUserClick = (button: string) => {
    setSelectedButton(button);
  };
  const handleLoginClick = () => {
    setIsModalOpen(true);
    setModalType("login");
    setSelectedButton("log-in");
    setUserDropdown(false);
  setLikedDropdown(false);
  setIsLoggingOut(false);
  };
  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    logOut();
  setLikedDropdown(false);
  setIsLoggingOut(false);
    // router.refresh();
  };

  const handleRegisterClick = () => {
    setIsModalOpen(true);
    setModalType("register");
    setSelectedButton("register");
     setUserDropdown(false);
  setLikedDropdown(false);
  setIsLoggingOut(false);
  };
  return (
    <div
      className="inset-x-0 z-50 h-16 bg-transparent fixed">
      <header id="navbar" className={`relative ${theme === "dark" ? "bg-white" : "bg-transparent"
        }`}>
        <MaxWidthWrapper className="py-10">
          {/* flex h-16 items-center justify-between */}
          <div className="flex w-full justify-center">
            {/* mt-[10px] flex justify-center */}
            <div
              id="menu"
              className={`mt-[20px] flex flex-1 justify-start -space-x-2`}
            >
              <div className="icon-wrapper">
                <button
                  id="hamburger-menu"
                  className={`hamburger logohover flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0`}
                  onClick={() => setIsToggle(!isToggle)}
                >
                  <span
                    className="hamburger-top absolute left-0 top-5 h-[2px] w-10 bg-white"
                    style={{ backgroundColor: iconColor }}
                  ></span>
                  <span
                    className="hamburger-bottom absolute left-0 top-5 h-[2px] w-10 bg-white"
                    style={{ backgroundColor: iconColor }}
                  ></span>
                </button>
              </div>
              <div className="mt-[15px] block lg:hidden">
                <img
                  src="/icons/search.svg"
                  className="icon h-[18px] w-[19px]"
                  alt="search"
                  style={{
                    filter: theme === "dark" ? "invert(0)" : "invert()",
                  }}
                />
              </div>
              {/** menu */}
              <div
                className={`absolute top-0 z-10 flex h-screen w-screen md:w-[300px] flex-col items-start bg-black pl-4 ${isToggle ? "sidenav active" : "sidenav"}`}
              >

                <div className="w-full mt-16 flex flex-col flex-1 items-start justify-center pr-16">
                  <div className="w-full flex flex-1 justify-end">
                    <button
                      className={`hamburger flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0 open`}
                      onClick={() => setIsToggle(!isToggle)}
                    >
                      <span
                        className="hamburger-top absolute left-0 top-5 h-[2px] w-10 bg-white"
                        style={{ backgroundColor: iconColor }}
                      ></span>
                      <span
                        className="hamburger-bottom absolute left-0 top-5 h-[2px] w-10 bg-white"
                        style={{ backgroundColor: iconColor }}
                      ></span>
                    </button>
                  </div>
                  <ul className="flex w-full flex-col items-start justify-center sm:space-y-2 lg:space-y-4">
                    <Link href="/products/new-in">
                      <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                        New In
                      </li>
                    </Link>
                    <Link href="/products/best-seller">
                      <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                        Best Seller
                      </li>
                    </Link>
                    <li className="flex items-center justify-center">
                      <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white"><Link href="/products/necklaces">Necklaces</Link></span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white"><Link href="/products/bracelets">Bracelets</Link></span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white"><Link href="/products/rings">Rings</Link></span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white"><Link href="/products/earrings">Earrings</Link></span>
                    </li>
                    <li className="cursor-pointer text-[20px] font-semibold tracking-widest text-white">
                      <Link href="/products/sale">Sale</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-1 w-full items-center justify-start">
                  <ul className="w-full sm:space-y-2 lg:space-y-4 border-t-[1px] border-solid border-[#4D4D4D] pt-6">
                    <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                      <Link href="/contact">Contact Us</Link>
                    </li>
                    <li className="cursor-pointer lg:text-[14px] xl:text-[16px] tracking-widest text-[#B3B3B3]">
                      Legal Terms
                    </li>
                    <li className="cursor-pointer lg:text-[14px] xl:text-[16px] tracking-widest text-[#B3B3B3]">
                      FAQ
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* icon-wrapper items-center justify-center lg:flex */}
            <div
              id="logo"
              className="icon-wrapper max-w-1/3 flex flex-1 items-center justify-center"
            >
              <Link href="/">
                {/** block icon sm:w-[70px] md:w-[80px] lg:w-[90px] xl:w-[93px] lg:hidden */}
                <img className="hidden lg:block icon" src={theme === 'dark' ? "/black_logo.svg" : "icons/white-logo.svg"} />
                <img className="sm:block logohover lg:hidden" src="/logo.svg" style={{
                  filter: theme === "dark" ? "invert(1)" : "invert(0)",
                }} />
              </Link>
            </div>

            {/* flex items-center justify-center */}
            <div id="icons" className="flex flex-1 items-center justify-end">
              <ul className="flex items-center justify-center space-x-4 md:space-x-6">
                <li className="icon-wrapper hidden cursor-pointer lg:block">
                  <img
                    src="/icons/search.svg"
                    className="icon h-[18px] w-[19px]"
                    alt="search"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                </li>
                <li onClick={() => setLikedDropdown(!likedDropdown)} className="relative icon-wrapper cursor-pointer">
                  {/* <LikedProducts theme={theme} user={user} /> */}
                  <Image
                    src="/icons/heart.svg"
                    width={24}
                    height={18.8}
                    alt="heart"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                  {likedCount > 0 && user !== "not authorized" && (
                    <span className="absolute -top-[0px] -right-[13px] bg-black text-white text-[8px] px-[4px]">{likedCount}</span>
                  )}
                </li>
                <li onClick={handleClick} className="icon-wrapper hidden cursor-pointer md:block">
                  {/* <UserAccountNav theme={theme} user={user} /> */}
                  <Image
                    src="/icons/user.svg"
                    width={15}
                    height={23}
                    alt="user"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                    onClick={() => setUserDropdown(!userDropdown)}
                  />
                </li>
                <li onClick={() => setBagDropdown(!bagDropdown)} className="relative icon-wrapper cursor-pointer">

                  {/* <Bag theme={theme} user={user} /> */}
                  <Image
                    src="/icons/bag.svg"
                    width={15}
                    height={23}
                    alt="bag"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                  {itemCount > 0 && user !== "not authorized" && (
                    <span className="absolute top-[0px] -right-[13px] bg-black text-white text-[8px] px-[4px]">{itemCount}</span>
                  )}

                </li>
                {userDropdown && (
                  <div className="w-fit absolute bg-black text-white top-[150px] right-[80px]">
                    {userCount > 0 ? (
                      <div className="w-full flex flex-col justify-center items-center space-y-8 p-12">
                      <div className="w-full flex justify-center items-center">
                        <button className="flex justify-center items-center bg-transparent text-[16px] text-white tracking-widest border-solid border-white border-[1px] p-2"><Link href="/profile">SEE YOUR PROFILE</Link></button>
                      </div>
                      {users.map((userItem) => (
                        <div key={userItem.user._id} className="w-full flex flex-col justify-center items-center space-y-4">
                          <div className="w-full flex justify-start items-center">
                            <span className="text-white font-semibold text-[18px] tracking-widest">
                              {userItem.user.firstName}
                            </span>
                          </div>
                          <div className="w-full flex justify-start items-center">
                            <span className="text-white font-semibold text-[18px] tracking-widest">
                              {userItem.user.lastName}
                            </span>
                          </div>
                          <div className="w-full flex justify-start items-center">
                            <span className="text-white font-semibold text-[16px] tracking-widest">
                              {userItem.user.email}
                            </span>
                          </div>
                          <div className="w-full flex justify-start items-center">
                            <button onClick={handleLogoutClick} className="text-white border-solid border-white border-[1px] px-4 py-2 cursor-pointer font-semibold text-[16px] tracking-widest">
                              {isLoggingOut ? (
                                <span className="flex items-center justify-center space-x-2">
                                  <span>Logging out</span>
                                  <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
                                </span>
                              ) : (
                                <span>Log out</span>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    ): (
                      
                        <div className="w-full p-12">
                            <div className="w-full flex justify-center items-center">
                              <div className="w-full flex flex-col justify-center items-center space-y-4">
                                <div>
                                  <button
                                    className="w-full border-[2px] border-solid border-white py-2 px-[50px] text-[16px] text-white"
                                    onClick={handleLoginClick}
                                  >
                                    LOG IN
                                  </button>
                                </div>
                                <div>
                                  <button
                                    className="w-full border-[2px] border-solid border-white py-2 px-[45px] text-[16px] text-white"
                                    onClick={handleRegisterClick}
                                  >
                                    SIGN UP
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                      
                    )}

                  </div>
                )}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  {modalType === "login" ? (
                    <div className="flex w-full flex-col h-fit items-center justify-center space-y-6">
                      <div className="flex w-full flex-col justify-center space-y-4">
                        <div
                          onClick={handleCloseModal}
                          className="flex items-center justify-end"
                        >
                          <Image
                            src="/icons/x.svg"
                            width={24}
                            height={24}
                            alt="close button"
                          />
                        </div>
                        <div className="flex w-full items-center justify-center space-x-6">
                          <div className="w-[194px]">
                            <button
                              onClick={() => handleUserClick("log-in")}
                              className={`w-full py-2 text-[14px] tracking-widest ${selectedButton == "log-in" ? "border-b-[1px] border-solid border-black" : ""}`}
                            >
                              Log in
                            </button>
                          </div>
                          <div className="w-[194px]">
                            <button
                              onClick={() => handleUserClick("register")}
                              className={`w-full py-2 text-[14px] tracking-widest ${selectedButton == "register" ? "border-b-[1px] border-solid border-black" : ""}`}
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                      {selectedButton == "log-in" && <LogIn />}
                      {selectedButton == "register" && <Register />}
                    </div>
                  ) : (
                    <div className="flex w-full flex-col h-fit items-center justify-center space-y-6">
                      <div className="flex w-full flex-col justify-center space-y-4">
                        <div
                          onClick={handleCloseModal}
                          className="flex items-center justify-end"
                        >
                          <Image
                            src="/icons/x.svg"
                            width={24}
                            height={24}
                            alt="close button"
                          />
                        </div>
                        <div className="flex w-full items-center justify-center space-x-6">
                          <div className="w-[194px]">
                            <button
                              onClick={() => handleUserClick("log-in")}
                              className={`w-full py-2 text-[14px] tracking-widest ${selectedButton == "log-in" ? "border-b-[1px] border-solid border-black" : ""}`}
                            >
                              Log in
                            </button>
                          </div>
                          <div className="w-[194px]">
                            <button
                              onClick={() => handleUserClick("register")}
                              className={`w-full py-2 text-[14px] tracking-widest ${selectedButton == "register" ? "border-b-[1px] border-solid border-black" : ""}`}
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                      {selectedButton == "log-in" && <LogIn />}
                      {selectedButton == "register" && <Register />}
                    </div>
                  )}
                </Modal>
                {likedDropdown && (
                  <div className="w-fit absolute bg-black text-white top-[150px] right-[80px]">

                    {user === "not authorized" ? (
                      <div className="w-full">
                        <div className="w-full flex justify-center items-center px-12 py-12">
                          <span className="text-[16px] tracking-widest">
                            you are not logged in.
                          </span>
                        </div>

                      </div>
                    ) : (
                      <>
                      {likedCount > 0 ? (
                        <div className="w-full flex flex-col justify-center items-center space-y-8 p-12">
                        <div className="w-full flex flex-col justify-center items-center space-y-4">
                          <div className="w-full flex justify-center items-center px-4">
                            <button className="flex justify-center items-center bg-transparent text-[16px] text-white tracking-widest border-solid border-white border-[1px] p-2"><Link href="/liked-products">SEE YOUR LIKED PRODUCTS</Link></button>
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <div className="flex justify-center items-center space-x-2">

                              <span className="">Total:</span>
                              <span className="font-semibold">{likedTotal}$</span>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                              <span className="">{isMounted ? likedCount : 0}</span>
                              <span className="font-semibold">items</span>
                            </div>

                          </div>
                        </div>
                        <div className="w-full flex justify-center items-center">

                          <div className="w-full flex flex-col justify-center items-center space-y-6">
                            {likedItems.map(({ product }) => (
                              <div key={product._id} className="w-full flex justify-start items-center space-x-2">
                                <div>
                                  <img src={product.selectedImageUrl} className="w-[120px] h-[80px]" />
                                </div>
                                <div className="w-full flex flex-col justify-center items-start space-y-2">
                                  <div className="w-full flex justify-between items-center">
                                    <span className="text-white text-[15px] tracking-widest">{product.productName}</span>
                                    <span><Trash className="w-[20px] h-[20px] cursor-pointer" onClick={() => handleLikedDelete(product._id)} /> </span>
                                  </div>
                                  <div className="w-full flex justify-start items-center">
                                    <span className="text-[16px] text-white font-semibold">
                                      
                                        <span className="font-bold text-[14px]">{product.sizes[0].price} $</span>
                                     
                                    </span>

                                  </div>
                                  <div className="w-full flex justify-between items-center">

                                    <div className="text-white tracking-widet text-[16px]">{product.productCategory}</div>

                                    {/* <div className="text-white tracking-widest text-[16px]">Qty: {product.quantity}</div> */}
                                    {product.selectedColor === "pinkGold" && (
                                      <div className="pink-gradient rounded-full w-[20px] h-[20px]" />
                                    )}
                                    {product.selectedColor === "silverGold" && (
                                      <div className="silver-gradient rounded-full w-[20px] h-[20px]" />
                                    )}
                                    {product.selectedColor === "yellowGold" && (
                                      <div className="gold-gradient rounded-full w-[20px] h-[20px]" />
                                    )}
                                    
                                    {/* {product.selectedColor} */}
                                    {/* <div className="flex justify-center items-center space-x-2">
                                      <div className={`pink-gradient rounded-full w-[20px] h-[20px] ${product.selectedColor === "pinkGold" ? "border-blue-700 border-solid border-[2px]" : ""}`} />
                                      <div className={`silver-gradient rounded-full w-[20px] h-[20px] ${product.selectedColor === "silverGold" ? "border-blue-700 border-solid border-[3px]" : ""}`} />
                                      <div className={`gold-gradient rounded-full w-[20px] h-[20px] ${product.selectedColor === "yellowGold" ? "" : "border-blue-700 border-solid border-[3px]"}`} />

                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      ): (
                        <>
                          <div className="w-full flex justify-center items-center px-12 py-12">
                            <span className="text-white text-[16px] tracking-widest font-semibold w-[300px] text-center">You haven't liked any products yet!</span>
                          </div>
                        </>
                      )}
                      
                      </>
                    )}

                  </div>

                )}
                {bagDropdown && (
                  <div className="w-fit absolute bg-black text-white top-[150px] right-[80px]">

                    {user === "not authorized" ? (
                      <div className="w-full">
                        <div className="w-full flex justify-center items-center px-12 py-12">
                          <span className="text-[16px] tracking-widest">
                            you are not logged in.
                          </span>
                        </div>

                      </div>
                    ) : (
                      <>
                      {itemCount > 0 ? (
                        <div className="w-full flex flex-col justify-center items-center space-y-8 p-12">
                        <div className="w-full flex flex-col justify-center items-center space-y-4">
                          <div className="w-full flex justify-center items-center px-4">
                            <button className="flex justify-center items-center bg-transparent text-[16px] text-white tracking-widest border-solid border-white border-[1px] p-2"><Link href="/bag">GO TO SHOPPING BAG</Link></button>
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <div className="flex justify-center items-center space-x-2">

                              <span className="">Total:</span>
                              <span className="font-semibold">{cartTotal}$</span>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                              <span className="">{isMounted ? itemCount : 0}</span>
                              <span className="font-semibold">items</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                          <div className="w-full flex flex-col justify-center items-center space-y-4">
                            {items.map(({ product }) => (
                              <div key={product.selectedImageUrl} className="w-full flex justify-start items-center space-x-2">
                                <div>
                                  <img src={product.selectedImageUrl} className="w-[120px] h-[80px]" />
                                </div>
                                <div className="w-full flex flex-col justify-center items-start space-y-2">
                                  <div className="w-full flex justify-between items-center">
                                    <span className="text-white text-[15px] tracking-widest">{product.productName}</span>
                                    <span><Trash className="w-[20px] h-[20px] cursor-pointer" onClick={() => handleDelete(product._id)} /> </span>
                                  </div>
                                  <div className="w-full flex justify-start items-center">
                                    <span className="text-[16px] text-white tracking-widest font-semibold">{product.totalPrice}$</span>
                                  </div>
                                  <div className="w-full flex justify-between items-center">
                                    {product.sizes[0].size !== 0 && (
                                      <div className="text-white tracking-widet text-[16px]">{product.sizes[0].size}</div>
                                    )}
                                    

                                    <div className="text-white tracking-widest text-[16px]">QTY: {product.quantity}</div>

                                    {product.selectedColor === "pinkGold" && (
                                      <div className="pink-gradient rounded-full w-[20px] h-[20px]" />
                                    )}
                                    {product.selectedColor === "yellowGold" && (
                                      <div className="gold-gradient rounded-full w-[20px] h-[20px]" />
                                    )}
                                    {product.selectedColor === "silverGold" && (
                                      <div className="silver-gradient rounded-full w-[20px] h-[20px]" />
                                    )}



                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      ): (
                        <>
                        <div className="w-full flex justify-center items-center px-12 py-12">
                            <span className="text-white text-[16px] tracking-widest font-semibold w-[300px] text-center">There's no products in the bag yet!</span>
                        </div>
                        </>
                      )}
                     
                      </>
                    )}
                  </div>
                )}

              </ul>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
