import React, { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";
import toast from "react-hot-toast";
import CustomLoader from "@/components/global/CustomLoader";
import { styles } from "../../../styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../../../components/global/Loader";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditCategories = (props: Props) => {
  const {
    data,
    isLoading: dataLoading,
    refetch,
  } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (isSuccess) {
      toast.success("Categories updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleCategoryChange = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoryHandler = () => {
    if (categories[categories.length - 1].title !== "") {
      setCategories([...categories, { title: "" }]);
    } else {
      toast.error("Category title cannot be empty!");
    }
  };

  // Function to check if the Categories arrays are unchanged
  const areCategoriesUnchanged = (
    originalCategory: any[],
    newCategory: any[]
  ) => {
    return JSON.stringify(originalCategory) === JSON.stringify(newCategory);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((c) => c.title === "");
  };

  const handleEdit = async () => {
    if (
      !isAnyCategoryTitleEmpty(categories) &&
      !areCategoriesUnchanged(data.layout.categories, categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {dataLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="mt-[120px] text-center flex items-center justify-center flex-col">
            <h1 className={`${styles.title}`}>All Categories</h1>
            {categories &&
              categories.map((category: any, index: number) => {
                return (
                  <div className="p-3" key={index}>
                    <div className="flex items-center w-full justify-center">
                      <input
                        className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                        value={category.title}
                        placeholder="Enter category title..."
                        onChange={(e) =>
                          handleCategoryChange(category._id, e.target.value)
                        }
                      />
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => {
                          setCategories((prevCategory: any) =>
                            prevCategory.filter(
                              (item: any) => item._id !== category._id
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoryHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !h-[40px] dark:text-white text-black !bg-[#cccccc34] flex items-center justify-center
            ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383] !text-white"
            }
            !rounded absolute bottom-12 right-12 !text-black
            `}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : handleEdit
            }
          >
            {isLoading ? <Loading /> : "Save"}
          </div>
        </>
      )}
    </>
  );
};

export default EditCategories;
