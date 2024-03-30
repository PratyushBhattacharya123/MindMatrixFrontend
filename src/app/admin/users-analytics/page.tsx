"use client";

import React from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../lib/utils/Heading";
import { AdminProtected } from "@/hooks/adminProtected";
import UserAnalytics from "../../../components/Admin/Analytics/UserAnalytics";

const page = () => {
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
            <UserAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
