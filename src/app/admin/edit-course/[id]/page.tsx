"use client";

import React from "react";
import AdminSidebar from "../../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../lib/utils/Heading";
import EditCourse from "../../../../components/Admin/Course/EditCourse";
import DashboardHeader from "../../../../components/Admin/DashboardHeader";
import { AdminProtected } from "@/hooks/adminProtected";

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <AdminProtected>
        <Heading
          title="MindMatrix - Admin"
          description="MindMatrix is a platform for students to learn and get help for teachers"
          keywords="Programming, MERN, Redux, Machine Learning, Digital Marketing"
        />
        <div className="flex">
          <div className="2xl:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
