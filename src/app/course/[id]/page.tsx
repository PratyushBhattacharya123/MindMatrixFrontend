"use client";

import React from "react";
import CourseDetailsPage from "../../../components/Course/CourseDetailsPage";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;
