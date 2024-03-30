"use client";

import Header from "@/components/Header";
import Heading from "@/lib/utils/Heading";
import React, { useState } from "react";
import Policy from "../../components/Policy";
import Footer from "@/components/Footer/Footer";

interface Props {}

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Policy - MindMatrix"
        description="MindMatrix is a platform for students to learn and get help for teachers"
        keywords="Programming, MERN, Redux, Machine Learning, Digital Marketing"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={3}
        route={route}
        setRoute={setRoute}
      />
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;
