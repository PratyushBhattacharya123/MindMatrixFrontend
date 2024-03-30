import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface CourseOptionsProps {
  active: number;
  setActive: (active: number) => void;
}

const CourseOptions: React.FC<CourseOptionsProps> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Data",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className={`w-full flex py-5`}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index
                ? "bg-blue-500"
                : "dark:bg-[#384766] bg-foreground/30"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px] font-semibold text-white" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 pt-[6px] ${
              active === index
                ? "dark:text-white text-black"
                : "text-muted-foreground"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
