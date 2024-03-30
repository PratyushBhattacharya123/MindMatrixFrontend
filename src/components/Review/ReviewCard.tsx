import Ratings from "@/lib/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
  index: number;
};

const ReviewCard = ({ item, index }: Props) => {
  return (
    // <div className="w-full h-max dark:bg-slate-500 bg-slate-200 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000028] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
    <div className="w-full h-max bg-gradient-to-r from-slate-300/50 to-slate-100/50 dark:from-slate-700 dark:to-slate-900 dark:bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
        <Image
          src={require(`../../../public/avatars/${
            index !== 19 ? index + 1 : 1
          }.png`)}
          alt=""
          height={50}
          width={50}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
        <div className="md:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] text-foreground">{item.name}</h5>
            <h6 className="text-[16px] text-muted-foreground">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>
        {/* For Mobile */}
        <div className="md:hidden justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-muted-foreground">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
