import React from "react";
import CoursePlayer from "../../../lib/utils/CoursePlayer";
import { discountPercentage } from "../../../lib/utils/utils";
import { styles } from "../../../styles/style";
import { Input } from "@/components/ui/input";
import Ratings from "../../../lib/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Loading from "@/components/global/Loader";

interface CoursePreviewProps {
  courseData: any;
  active: number;
  setActive: (active: number) => void;
  handleCreateCourse: any;
  isLoading: boolean;
  isEdit: boolean;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({
  courseData,
  active,
  setActive,
  handleCreateCourse,
  isLoading,
  isEdit,
}) => {
  const handlePrevButton = () => {
    setActive(active - 1);
  };

  const handleCreateButton = () => {
    handleCreateCourse();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through text-muted-foreground">
            {courseData?.estimatedPrice && <>{courseData?.estimatedPrice}$</>}
          </h5>
          {courseData?.estimatedPrice && (
            <h4 className="pl-4 pt-4 text-[22px]">
              {discountPercentage(
                courseData?.estimatedPrice,
                courseData?.price
              )}
              % Off
            </h4>
          )}
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] !bg-[crimson] my-3 font-Poppins hover:bg-[crimson]/80 text-white cursor-not-allowed flex items-center justify-center`}
          >
            Buy Now for {courseData?.price}$
          </div>
        </div>

        <div className="flex items-center">
          <Input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} 2xl:!w-[50%] lg:!w-[60%] ml-3`}
          />
          <div
            className={`${styles.button} !bg-blue-600 h-[46px] hover:!bg-blue-500 !rounded-[23px] text-white !w-[120px] ml-6 mt-[6px] cursor-pointer font-Poppins flex items-center justify-center`}
          >
            Apply
          </div>
        </div>
        <div className="mt-4">
          <p className="pb-1">
            <li>Source code included.</li>
          </p>
          <p className="pb-1">
            <li>Full lifetime access.</li>
          </p>
          <p className="pb-1">
            <li>Certificate of completion.</li>
          </p>
          <p className="pb-3 md:pb-1">
            <li>Premium support.</li>
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full md:pr-5">
          <br />
          <h1 className="text-[25px] font-Poppins font-semibold">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5 className="ml-2">0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
        </div>
        <br />
        <br />

        {/* course benefits */}
        <h1 className="text-[25px] font-Poppins font-semibold">
          What you will learn from this course?
        </h1>
        {courseData?.benefits.map((benefit: any, index: number) => (
          <div className="w-full flex md:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{benefit.title}</p>
          </div>
        ))}
        <br />
        <br />

        {/* course prerequisites */}
        <h1 className="text-[25px] font-Poppins font-semibold">
          What are the prerequisites for starting this course?
        </h1>
        {courseData?.prerequisites.map((prerequisite: any, index: number) => (
          <div className="w-full flex md:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{prerequisite.title}</p>
          </div>
        ))}
        <br />
        <br />

        {/* course description */}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-semibold">
            Course Details
          </h1>
          <p className="text-[18px] mt-[16px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>

      <div className="flex items-center justify-between w-full">
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-6 cursor-pointer flex items-center justify-center"
          onClick={() => handlePrevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-6 cursor-pointer flex items-center justify-center"
          onClick={() => handleCreateButton()}
        >
          {isLoading ? <Loading /> : <>{isEdit ? "Update" : "Create"}</>}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
