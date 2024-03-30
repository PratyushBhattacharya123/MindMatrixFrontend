import React, { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";
import { styles } from "@/styles/style";
import toast from "react-hot-toast";
import Loading from "../../../components/global/Loader";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner.image?.url);
    }
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center mb-10 mt-24">
      <div className="flex justify-center items-center mt-10 lg:-mt-10 mb-10 lg:ml-20 2xl:w-[700px] xl:w-[600px] lg:w-[400px] w-[280px] md:w-[500px] xl:mt-28">
        <input
          type="file"
          name=""
          id="banner"
          accept="image/*"
          onChange={handleUpdate}
          className="hidden"
        />
        <label htmlFor="banner">
          <img
            src={image}
            alt="Application Banner"
            className="rounded-lg cursor-pointer"
          />
        </label>
      </div>
      <div className="lg:w-[50%] flex flex-col items-center lg:mt-0 text-center lg:text-left flex-1 z-50 lg:mr-20 lg:ml-12 ml-3 mr-3">
        <textarea
          rows={4}
          placeholder="Improve Your Online Learning Experience With MindMatrix"
          className="dark:text-white text-[#000000c7] text-[28px] px-3 w-full lg:text-[50px] font-semibold py-2 lg:leading-[75px] resize-none bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="We have 40k+ online courses & 500k+ online registered student. Find
          your desired courses from them."
          className="dark:text-[#edfff4] text-[#000000ac] font-semibold text-[15px] 2xl:!w-[55%] lg:!w-[70%] bg-transparent resize-none h-[120px]"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <br />
        <br />
        <div
          className={`${
            styles.button
          } !w-[100px] !min-h-[40px] !h-[40px] flex items-center justify-center dark:text-white text-black !bg-[#cccccc34] ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? "!cursor-pointer !bg-[#42d383]"
              : "!cursor-not-allowed"
          }`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? handleEdit
              : () => null
          }
        >
          {isLoading ? <Loading /> : "Save"}
        </div>
      </div>
    </div>
  );
};

export default EditHero;
