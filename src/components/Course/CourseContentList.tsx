import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}: Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find Unique Video Sections
  const videoSections: string[] = data?.reduce(
    (uniqueSections: string[], item: any) => {
      if (!uniqueSections.includes(item.videoSection)) {
        uniqueSections.push(item.videoSection);
      }
      return uniqueSections;
    },
    []
  );

  let totalCount: number = 0; //Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections &&
        videoSections.map((section: string, sectionIndex: number) => {
          const isSectionVisible = visibleSections.has(section);

          // Filter videos by section
          const sectionVideos: any[] = data?.filter(
            (item: any) => item.videoSection === section
          );

          const sectionVideoCount: number = sectionVideos.length; //Number of videos in the current section
          const sectionVideoLength: number = sectionVideos.reduce(
            (totalLength: number, item: any) => totalLength + item.videoLength,
            0
          );

          const sectionStartIndex: number = totalCount; //Start index of videos within the current section
          totalCount += sectionVideoCount; //Updating the total count of videos

          const sectionContentHours: number = Number(
            (sectionVideoLength / 60).toFixed(0)
          );

          const sectionContentHoursMinutesRemaining: number =
            sectionVideoLength % 60;

          return (
            <div
              className={`${!isDemo && "border-b border-[#ffffff8e] pb-2"}`}
              key={sectionIndex}
            >
              <div className="w-full flex">
                {/* Render Video Section */}
                <div className="w-full flex justify-between items-center">
                  <h2 className="text-[22px] text-black dark:text-white">
                    {section.trim()}
                  </h2>
                  <button
                    className="mr-4 cursor-pointer text-black dark:text-white"
                    onClick={() => toggleSection(section)}
                  >
                    {isSectionVisible ? (
                      <BsChevronUp size={20} />
                    ) : (
                      <BsChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>
              <h5 className="text-black dark:text-white">
                {sectionVideoCount} Lessons •{" "}
                {sectionVideoLength < 60
                  ? sectionVideoLength
                  : sectionContentHours}{" "}
                {sectionVideoLength > 60
                  ? sectionContentHours === 1
                    ? "hour"
                    : "hours"
                  : ""}{" "}
                {sectionVideoLength > 60 && sectionContentHoursMinutesRemaining}{" "}
                {sectionVideoLength > 60 &&
                sectionContentHoursMinutesRemaining &&
                sectionContentHoursMinutesRemaining === 1
                  ? "minute"
                  : "minutes"}
              </h5>
              <br />
              {isSectionVisible && (
                <div className="w-full mb-3">
                  {sectionVideos.map((item: any, index: number) => {
                    const videoIndex: number = sectionStartIndex + index; //Calculate the video within the overall list
                    const contentLength: number = Number(
                      (item.videoLength / 60).toFixed(0)
                    );
                    const contentLengthMinutes: number = item.videoLength % 60;
                    return (
                      <div
                        className={`w-full ${
                          videoIndex === activeVideo ? "bg-slate-800" : ""
                        } cursor-pointer transition-all p-2`}
                        key={item._id}
                        onClick={() =>
                          isDemo ? null : setActiveVideo(videoIndex)
                        }
                      >
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <MdOutlineOndemandVideo
                              size={25}
                              className="mr-4"
                              color="#1cdada"
                            />
                          </div>
                          <div className="flex items-start flex-col">
                            <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                              {item.title}
                            </h1>
                            <h5 className="text-black dark:text-white">
                              {item.videoLength < 60
                                ? item.videoLength
                                : contentLength}{" "}
                              {item.videoLength > 60
                                ? contentLength === 1
                                  ? "hour"
                                  : "hours"
                                : ""}{" "}
                              {item.videoLength > 60 && contentLengthMinutes}{" "}
                              {item.videoLength > 60 &&
                              contentLengthMinutes &&
                              contentLengthMinutes === 1
                                ? "minute"
                                : "minutes"}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CourseContentList;
