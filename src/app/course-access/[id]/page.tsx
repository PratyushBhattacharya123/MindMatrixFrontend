"use client";

import React from "react";
import CourseAccess from "../../../components/Course/CourseAccess";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  const id = params.id;

  return <CourseAccess id={id} />;
};

export default page;
