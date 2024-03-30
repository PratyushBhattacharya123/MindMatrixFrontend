import Image from "next/image";
import React from "react";
import { FaCertificate } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import AvatarDefault from "../../../public/Avatar.png";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

interface Props {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logOutHandler: any;
}

const SidebarProfile: React.FC<Props> = ({
  user,
  active,
  avatar,
  logOutHandler,
  setActive,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url : avatar || AvatarDefault
          }
          alt=""
          height={32}
          width={32}
          className="w-[32px] h-[32px] rounded-full border border-[#37a39a]/20"
        />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(4)}
      >
        <FaCertificate size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Certificates
        </h5>
      </div>
      {user.role === "admin" && (
        <Link
          href={"/admin"}
          className="w-full flex items-center px-3 py-4 cursor-pointer"
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        className="w-full flex items-center px-3 py-4 cursor-pointer"
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
