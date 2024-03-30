import React, { useEffect, useState } from "react";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import CustomLoader from "../global/CustomLoader";
import CourseContent from "./CourseContent";

type Props = {
  id: string;
};

const CourseAccess = ({ id }: Props) => {
  const { data, isLoading, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.user?.courses.find(
        (course: any) => course._id === id
      );

      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, id, error]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default CourseAccess;
