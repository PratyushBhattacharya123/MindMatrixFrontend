import { Label } from "@/components/ui/label";
import { styles } from "../../../styles/style";
import React from "react";
import { Input } from "@/components/ui/input";
import { MdOutlineAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

interface CourseDataProps {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseData: React.FC<CourseDataProps> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    if (benefits[benefits.length - 1]?.title === "") {
      toast.error("Please fill out this benefit field first!");
    } else {
      setBenefits([...benefits, { title: "" }]);
    }
  };

  const handleDeleteBenefit = () => {
    if (benefits.length > 1) {
      const updatedBenefits = benefits.slice(0, -1);
      setBenefits(updatedBenefits);
    } else {
      toast.error("At least one benefit must be added.");
    }
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    if (prerequisites[prerequisites.length - 1]?.title === "") {
      toast.error("Please fill out this prerequisite field first!");
    } else {
      setPrerequisites([...prerequisites, { title: "" }]);
    }
  };

  const handleDeletePrerequisite = () => {
    if (prerequisites.length > 1) {
      const updatedPrerequisites = prerequisites.slice(0, -1);
      setPrerequisites(updatedPrerequisites);
    } else {
      toast.error("At least one prerequisite must be added.");
    }
  };

  const handlePrevButton = () => {
    setActive(active - 1);
  };

  const handleNextButton = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields then click next.");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block mb-5">
      <div>
        <Label className={`${styles.label}`} htmlFor="benefit">
          What are the benefits for students in this course?
        </Label>
        <br />
        {benefits?.map((benefit: any, index: number) => (
          <Input
            type="text"
            key={index}
            name="Benefit"
            id="benefit"
            placeholder="You will be able to build a full stack application using Next.js, NodeJS, Express..."
            required
            className={`${styles.input}`}
            value={benefit.value}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <div className="w-full flex items-center justify-between">
          <MdOutlineAddCircle
            style={{
              margin: "10px 0",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            className="text-foreground/80 hover:text-foreground"
            onClick={handleAddBenefit}
          />
          <MdOutlineDeleteOutline
            style={{
              margin: "10px 0",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            className="text-foreground/80 hover:text-foreground"
            onClick={handleDeleteBenefit}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label className={`${styles.label}`} htmlFor="prerequisites">
          What are the prerequisites for students in this course?
        </Label>
        <br />
        {prerequisites?.map((prerequisite: any, index: number) => (
          <Input
            type="text"
            key={index}
            name="Prerequisite"
            id="prerequisites"
            placeholder="You need to have basic knowledge of MERN stack"
            required
            className={`${styles.input}`}
            value={prerequisite.value}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <div className="w-full flex items-center justify-between">
          <MdOutlineAddCircle
            style={{
              margin: "10px 0",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            className="text-foreground/80 hover:text-foreground"
            onClick={handleAddPrerequisite}
          />
          <MdOutlineDeleteOutline
            style={{
              margin: "10px 0",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            className="text-foreground/80 hover:text-foreground"
            onClick={handleDeletePrerequisite}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={() => handlePrevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={() => handleNextButton()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
