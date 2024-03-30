import React, { useState } from "react";
import { useGetCourseContentQuery } from "../../../redux/features/courses/coursesApi";
import CustomLoader from "../global/CustomLoader";
import Heading from "@/lib/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  const title = data?.[activeVideo]?.title.split(":")[1].trim();

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid md:grid-cols-10 mt-3">
            <Heading
              title={title}
              description="MindMatrix is a platform developed by Pratyush for helping students"
              keywords={contentData?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                reviews={contentData?.reviews}
                refetch={refetch}
              />
            </div>
            <div className="hidden md:block md:col-span-3">
              <CourseContentList
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                data={data}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
