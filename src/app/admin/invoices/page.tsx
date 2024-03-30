"use client";

import DashboardHeader from "../../../components/Admin/DashboardHeader";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../lib/utils/Heading";
import React from "react";
import AllInvoices from "../../../components/Admin/Order/AllInvoices";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
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
          <AllInvoices />
        </div>
      </div>
    </div>
  );
};

export default page;
