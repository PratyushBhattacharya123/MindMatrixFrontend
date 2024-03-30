import Image from "next/image";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";
import CustomLoader from "./global/CustomLoader";
import { useRouter } from "next/navigation";

const HeroBanner = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  const bannerData = data?.layout?.banner;
  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="w-full flex flex-col lg:flex-row items-center justify-center mb-10">
            <>
              {/* grid */}
              <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(132,109,244,0.5)] opacity-50 blur-[80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            </>
            <div className="flex justify-center items-center mt-10 lg:-mt-10 mb-10 lg:ml-20 2xl:w-[700px] xl:w-[600px] lg:w-[400px] w-[280px] md:w-[500px] xl:mt-28">
              <img
                src={bannerData?.image?.url}
                alt="Application Banner"
                className="rounded-lg"
              />
              <div className="absolute top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px] lg:h-[600px] lg:w-[600px] h-[280px] w-[280px] md:w-[520px] md:h-[400px] bottom-14 flex-1 overflow-x-hidden">
                <div className="absolute bottom-0 top-[30%] bg-gradient-to-t from-background left-0 -right-20 z-10" />
                <div className="absolute bottom-0 top-[50%] bg-gradient-to-t from-background left-0 -right-20 z-10" />
                <div className="absolute bottom-0 top-[50%] bg-gradient-to-t light:from-background left-0 -right-20 z-10" />
                <div className="absolute bottom-0 top-[50%] bg-gradient-to-t light:from-background left-0 -right-20 z-10" />
                <div className="absolute bottom-0 lg:top-[80px] top-0 bg-gradient-to-r dark:from-background/60 left-0 -right-20 z-10" />
                <div className="absolute bottom-0 top-[30%] bg-gradient-to-t from-background left-0 -right-20 z-10" />
              </div>
            </div>
            <div className="lg:w-[50%] flex flex-col items-center lg:mt-0 text-center lg:text-left flex-1 z-50 lg:mr-20 lg:ml-12 ml-3 mr-3">
              <h2 className="dark:text-white text-[#000000c7] text-[28px] px-3 w-full lg:text-[50px] font-semibold py-2 lg:leading-[75px]">
                {bannerData?.title}
              </h2>
              <br />
              <p className="dark:text-[#edfff4] text-[#000000ac] font-semibold text-[15px] 2xl:!w-[55%] lg:!w-[70%]">
                {bannerData?.subTitle}
              </p>
              <br />
              <br />
              <div className="2xl:w-[55%] lg:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                <Input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Courses..."
                  className="bg-transparent border dark:border-none dark:bg-[#575757]/35 dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-black/80 dark:text-white/80 text-[20px] font-normal font-Josefin pl-4"
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#105671] rounded-r-[5px]"
                  onClick={handleSearch}
                >
                  <Search className="text-white" size={30} />
                </div>
              </div>
              <br />
              <div className="2xl:w-[55%] lg:w-[78%] w-[90%] flex items-center md:mt-3">
                <Image
                  src={require("../../public/avatars/1.png")}
                  alt=""
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <Image
                  src={require("../../public/avatars/3.png")}
                  alt=""
                  className="rounded-full ml-[-20px]"
                  width={40}
                  height={40}
                />
                <Image
                  src={require("../../public/avatars/2.png")}
                  alt=""
                  className="rounded-full ml-[-20px]"
                  width={40}
                  height={40}
                />
                <p className="dark:text-[#edfff4] text-[#000000b3] md:pl-3 pl-1 text-[15px] font-medium">
                  500k+ people already trusted us.{" "}
                  <Link
                    href={"/courses"}
                    className="dark:text-[#46e256] text-[crimson]"
                  >
                    View Courses
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeroBanner;
