import { Label } from "@/components/ui/label";
import { styles } from "../../../styles/style";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface CourseContentProps {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
}

const CourseContent: React.FC<CourseContentProps> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    const linkData = updatedData[index].links;
    const lastLinkData = linkData[linkData.length - 1];
    if (lastLinkData) {
      const { title, url } = lastLinkData;
      if (!title || !url) {
        toast.error("Please fill all the fields of the current link");
        return;
      } else {
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
      }
    }
  };

  const newContentHandler = (courseContentField: any) => {
    if (
      courseContentField.title === "" ||
      courseContentField.description === "" ||
      courseContentField.videoUrl === "" ||
      courseContentField.links[0].title === "" ||
      courseContentField.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSectionName = "";

      if (courseContentData.length > 0) {
        const lastVideoSectionName =
          courseContentData[courseContentData.length - 1].videoSection;

        // for now using the last section name if available
        if (lastVideoSectionName) {
          newVideoSectionName = lastVideoSectionName;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSectionName,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error(
        "Please complete the current section before adding a new one."
      );
    } else {
      setActiveSection(activeSection + 1);
      const newSectionContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section - (${activeSection})`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };

      setCourseContentData([...courseContentData, newSectionContent]);
    }
  };

  const handlePrevButton = () => {
    setActive(active - 1);
  };

  const handleNextButton = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section data cannot be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-12 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((courseContentField: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            courseContentField.videoSection !==
              courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mt-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        className={`text-[20px] ${
                          courseContentField.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={courseContentField.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {courseContentField.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {courseContentField.title}
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* Arrow Button for collapsed video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <Label className={`${styles.label}`}>Video Title</Label>
                      <Input
                        type="text"
                        placeholder="Enter video title..."
                        className={`${styles.input}`}
                        value={courseContentField.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <Label className={`${styles.label}`}>Video Url</Label>
                      <Input
                        type="url"
                        placeholder="Enter video url..."
                        className={`${styles.input}`}
                        value={courseContentField.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <Label className={`${styles.label}`}>
                        Video Length (in minutes)
                      </Label>
                      <Input
                        type="number"
                        placeholder="20 mins"
                        className={`${styles.input}`}
                        value={courseContentField.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = { ...updatedData[index], videoLength: e.target.value };
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <Label className={`${styles.label}`}>
                        Video Description
                      </Label>
                      <Textarea
                        placeholder="Write a description for the video..."
                        rows={8}
                        cols={30}
                        className={`${styles.input} !h-min py-2`}
                        value={courseContentField.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {courseContentField?.links.map(
                      (link: any, linkIndex: number) => (
                        <div className="mb-3 block" key={linkIndex}>
                          <div className="w-full flex items-center justify-between">
                            <Label className={`${styles.label}`}>
                              Link {linkIndex + 1}
                            </Label>
                            <AiOutlineDelete
                              className={`${
                                linkIndex === 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              }`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                            />
                          </div>
                          <Input
                            type="text"
                            placeholder="Source code... (Link Title)"
                            className={`${styles.input}`}
                            value={link.title}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                          <Input
                            type="url"
                            placeholder="Source code url... (Link Url)"
                            className={`${styles.input}`}
                            value={link.url}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                        </div>
                      )
                    )}
                    <br />

                    {/* Add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white/80 hover:dark:text-white text-black/70 hover:text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />

                {/* Add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white/80 hover:dark:text-white text-black/70 hover:text-black cursor-pointer mt-2"
                      onClick={(e: any) =>
                        newContentHandler(courseContentField)
                      }
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />

        {/* Add new section*/}
        <div
          className="flex items-center text-[20px] dark:text-white/80 hover:dark:text-white text-black/70 hover:text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-6 cursor-pointer flex items-center justify-center"
          onClick={() => handlePrevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-6 cursor-pointer flex items-center justify-center"
          onClick={() => handleNextButton()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
