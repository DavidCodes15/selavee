"use client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Image from "next/image";
import Modal from "./Modal";
import LogIn from "./authHandle/log-in/page";
import Register from "./authHandle/register/page";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
type User = {
  _id: string;
  email?: string;
  [key: string]: any;
};
import { useRouter } from "next/navigation";
const UserAccountNav = ({ theme, user }: { theme: string, user: User | "not authorized" | null }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleLoginClick = () => {
    setIsModalOpen(true);
    setModalType("login");
    setSelectedButton("log-in");
  };
  const { mutate, isLoading } = trpc.auth.logOut.useMutation({
    onError: (err) => {
      toast.error("Couldn't log out. There was some problem.");
    },
    onSuccess: () => {
      toast.success("logged out successfully.");
      setIsLoggingOut(false);
    },
  });
  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    mutate();
    router.refresh();
  };

  const handleRegisterClick = () => {
    setIsModalOpen(true);
    setModalType("register");
    setSelectedButton("register");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.refresh();
  };
  const [selectedButton, setSelectedButton] = useState("log-in");
  const handleClick = (button: string) => {
    setSelectedButton(button);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="icon">
        <Image
          src="/icons/user.svg"
          width={15}
          height={23}
          alt="user"
          style={{
            filter: theme === "dark" ? "invert(1)" : "invert(0)",
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-20 mt-5 w-fit bg-white" align="center">
        <>
          <div className="flex w-full items-center justify-start space-x-4">
            {user === ("not authorized") ? (
                <span className="flex justify-center items-center">
                <span className="text-[16px] tracking-widest font-semibold">User</span>
                <span className="text-[14px] tracking-widest text-gray-400">(not logged in)</span>
              </span>
            ): (
              <div className="flex flex-col items-start justify-center space-y-2">
                <div className="flex items-center justify-center space-x-[5px]">
                  <span>{user?.firstName || "User"}</span>
                  <span>{user?.lastName || "User"}</span>
                </div>
                <span>{user?.email || "User"}</span>
              </div>
            )}
            {/* { user === "not authorized" ? (
              <span className="flex justify-center items-center">
                <span className="text-[16px] tracking-widest font-semibold">User</span>
                <span className="text-[14px] tracking-widest text-gray-400">(not logged in)</span>
              </span>
            ) : (
              <div className="flex flex-col items-start justify-center space-y-2">
                <div className="flex items-center justify-center space-x-[5px]">
                  <span>{user.firstName || "User"}</span>
                  <span>{user.lastName || "User"}</span>
                </div>
                <span>{user.email || "User"}</span>
              </div>
            )} */}
          </div>
          <DropdownMenuSeparator className="mt-6" />
          {user ===  ("not authorized") ? (
            <>
              <DropdownMenuItem className="w-full cursor-pointer">
                <div className="flex w-full items-center justify-center">
                  <button
                    className="w-[85%] border-b-[2px] border-solid border-black bg-black py-2 text-[16px] text-white"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </button>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full cursor-pointer">
                <div className="flex w-full items-center justify-center">
                  <button
                    className="w-[85%] border-b-[2px] border-solid border-black bg-black py-2 text-[16px] text-white"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </div>
              </DropdownMenuItem>
            </>
          ) : (
            <>
             
              <DropdownMenuItem className="w-full cursor-pointer">
                <div className="flex w-full items-center justify-center">
                  <button
                    className="w-[85%] border-b-[2px] border-solid border-black bg-black py-2 text-[16px] text-white"
                    onClick={handleLogoutClick}
                  >
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
              </DropdownMenuItem>
            </>
          )}
        </>
      </DropdownMenuContent>
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
                    onClick={() => handleClick("log-in")}
                    className={`w-full py-2 text-[14px] tracking-widest ${selectedButton == "log-in" ? "border-b-[1px] border-solid border-black" : ""}`}
                  >
                    Log in
                  </button>
                </div>
                <div className="w-[194px]">
                  <button
                    onClick={() => handleClick("register")}
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
                    onClick={() => handleClick("log-in")}
                    className={`w-full py-2 text-[14px] tracking-widest ${selectedButton == "log-in" ? "border-b-[1px] border-solid border-black" : ""}`}
                  >
                    Log in
                  </button>
                </div>
                <div className="w-[194px]">
                  <button
                    onClick={() => handleClick("register")}
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
    </DropdownMenu>
  );
};

export default UserAccountNav;
