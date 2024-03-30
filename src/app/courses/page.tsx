"use client";

import Header from "@/components/Header";
import Heading from "@/lib/utils/Heading";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetAllCoursesUserQuery } from "../../../redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import CustomLoader from "@/components/global/CustomLoader";
import { styles } from "@/styles/style";
import { MdOutlineSmsFailed } from "react-icons/md";
import CourseCard from "@/components/Course/CourseCard";
import Footer from "@/components/Footer/Footer";

interface Props {}

const Page: React.FC<Props> = (props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data: allCoursesData, isLoading: allCoursesLoading } =
    useGetAllCoursesUserQuery(undefined, {});
  const { data: categoryData } = useGetHeroDataQuery("Categories", {});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(allCoursesData?.courses);
    }
    if (category !== "All") {
      setCourses(
        allCoursesData?.courses?.filter(
          (course: any) => course.categories === category
        )
      );
    }
    if (search) {
      setCourses(
        allCoursesData?.courses.filter((course: any) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [category, search, allCoursesData]);

  const categories = categoryData?.layout?.categories;

  return (
    <>
      {allCoursesLoading ? (
        <CustomLoader />
      ) : (
        <>
          <Heading
            title="All Courses - MindX"
            description="MindMatrix is a platform for students to learn and get help for teachers"
            keywords="Programming, MERN, Redux, Machine Learning, Digital Marketing"
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-[95%] md:w-[85%] m-auto">
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} min-h-[50vh] flex flex-col justify-center items-center text-center gap-10`}
              >
                <MdOutlineSmsFailed className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] text-muted-foreground/30" />
                {search
                  ? "No courses found!"
                  : "No courses found in this category. Please try another one!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((course: any, index: number) => (
                  <CourseCard item={course} key={index} />
                ))}
            </div>
          </div>
          <br />
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
