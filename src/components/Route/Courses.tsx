import React, { useEffect, useState } from "react";
import { useGetAllCoursesUserQuery } from "../../../redux/features/courses/coursesApi";
import CourseCard from "../Course/CourseCard";
import CustomLoader from "../global/CustomLoader";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllCoursesUserQuery({});
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="w-[90%] md:w-[80%] m-auto mt-[50px] md:mt-[200px] lg:mt-[20px]">
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white md:!leading-[60px] text-[#000] font-bold tracking-tight">
              Expand Your Career{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">
                Opportunity
              </span>
              <br />
              Opportunity With Our Courses
            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((course: any, index: number) => (
                  <CourseCard item={course} key={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
