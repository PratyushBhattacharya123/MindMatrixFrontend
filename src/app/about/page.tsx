"use client";

import Header from "@/components/Header";
import Heading from "@/lib/utils/Heading";
import React, { useState } from "react";
import About from "../../components/About";
import Footer from "@/components/Footer/Footer";

interface Props {}

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="About Us - MindMatrix"
        description="MindMatrix is a platform for students to learn and get help for teachers"
        keywords="Programming, MERN, Redux, Machine Learning, Digital Marketing"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        route={route}
        setRoute={setRoute}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;
