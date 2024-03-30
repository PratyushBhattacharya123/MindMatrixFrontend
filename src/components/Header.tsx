"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./global/mode-toggle";
import NavItems from "./global/nav-items";
import Logo from "../../public/MindMatrix.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { UserCircleIcon } from "lucide-react";
import CustomModal from "./global/CustomModal";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Verification from "../components/auth/Verification";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import Avatar from "../../public/Avatar.png";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import CustomLoader from "./global/CustomLoader";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: React.FC<Props> = ({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Logged in Successfully!");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  const handleMobileProfileIcon = () => {
    setOpen(true);
    setOpenSidebar(false);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="sticky top-0 right-0 p-4 h-[80px] w-full flex items-center justify-between z-[999999999] dark:bg-[#03070f] bg-slate-100">
          <div className="w-[95%] md:w-[92%] m-auto py-2 h-full flex items-center justify-between">
            <aside className="flex items-center gap-2">
              <Link
                href={"/"}
                className="text-[25px] font-[700] text-black dark:text-white flex items-center gap-2"
              >
                <Image src={Logo} alt="MindX" height={45} width={45} />
                <span className="text-[20px] text-muted-foreground">MindX</span>
              </Link>
            </aside>
            <nav className="flex items-center absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              <NavItems activeItem={activeItem} isMobile={false} />
            </nav>
            <aside className="flex gap-3 items-center">
              <ModeToggle />
              {/* Only for desktop */}
              <div className="hidden md:flex">
                {userData ? (
                  <Link href={"/profile"} className="cursor-pointer">
                    <Image
                      src={
                        userData?.user?.avatar
                          ? userData?.user?.avatar.url
                          : Avatar
                      }
                      alt=""
                      height={36}
                      width={36}
                      className="w-[36px] h-[36px] rounded-full border border-[#37a39a]/20"
                      style={{
                        border: activeItem === 5 ? "2px solid #37a39a" : "",
                      }}
                    />
                  </Link>
                ) : (
                  <UserCircleIcon
                    size={28}
                    className="cursor-pointer dark:text-white/85 text-black/70"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
              {/* Only for Mobile */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </aside>
          </div>
        </div>
      )}
      <div className="w-full relative">
        <div>
          {/* Mobile Sidebar */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[1000000000] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 backdrop-blur-md">
                <NavItems activeItem={activeItem} isMobile={true} />
                <div className="flex md:hidden">
                  {userData ? (
                    <Link href={"/profile"} className="cursor-pointer ml-6">
                      <Image
                        src={
                          userData?.user?.avatar
                            ? userData?.user?.avatar.url
                            : Avatar
                        }
                        alt=""
                        height={36}
                        width={36}
                        className="w-[36px] h-[36px] rounded-full border border-[#37a39a]/20"
                        style={{
                          border: activeItem === 5 ? "2px solid #37a39a" : "",
                        }}
                      />
                    </Link>
                  ) : (
                    <UserCircleIcon
                      size={28}
                      className="cursor-pointer dark:text-white/85 text-black/70 ml-6"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
                <br />
                <br />
                <p className="text-[16px] px-2 pl-5 text-black/70 dark:text-muted-foreground">
                  Copyright &#169; 2023 MindMatrix
                </p>
              </div>
            </div>
          )}
        </div>
        {route === "Login" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Login}
                refetch={refetch}
              />
            )}
          </>
        )}
        {route === "Sign-Up" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={SignUp}
              />
            )}
          </>
        )}
        {route === "Verification" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Verification}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
