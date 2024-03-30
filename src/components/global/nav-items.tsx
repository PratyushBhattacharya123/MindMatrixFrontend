import React from "react";
import { NavItemsData } from "@/lib/utils/constant";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/MindMatrix.png";

interface Props {
  activeItem: number;
  isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex">
        {NavItemsData &&
          NavItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-5 md:px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <>
          <div className="flex items-center justify-center mt-8 gap-2">
            <Image src={Logo} alt="MindX" height={45} width={45} />
            <span className="text-[20px] text-muted-foreground font-semibold">
              MindX
            </span>
          </div>
          <div className="mt-2 800px:hidden w-full text-center py-6 flex flex-col items-start gap-8">
            {NavItemsData &&
              NavItemsData.map((item, index) => (
                <Link href={`${item.url}`} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black"
                    } text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default NavItems;
