"use client";

import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Heading from "@/lib/utils/Heading";
import React, { useState } from "react";
import Courses from "../components/Route/Courses";
import Reviews from "../components/Route/Reviews";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

interface Props {}

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="MindMatrix"
        description="MindMatrix is a platform for students to learn and get help for teachers"
        keywords="Programming, MERN, Redux, Machine Learning, Digital Marketing"
      />
      <div className="h-[100vh]">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />
        <HeroBanner />
      </div>
      <div className="mt-[150px] md:mt-0">
        <Courses />
      </div>
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
