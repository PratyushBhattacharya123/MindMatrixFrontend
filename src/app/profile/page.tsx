"use client";

import React, { useState } from "react";
import Heading from "../../lib/utils/Heading";
import Header from "../../components/Header";
import { Protected } from "../../hooks/useProtected";
import Profile from "../../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "@/components/Footer/Footer";

type Props = {};

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} Profile - MindX`}
          description="MindMatrix is a platform for students to learn and get help for teachers"
          keywords="Programming, MERN, Redux, Machine Learning, Digital Marketing"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
        <br />
        <br />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
