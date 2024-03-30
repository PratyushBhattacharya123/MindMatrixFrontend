"use client";

import React, { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetAllCoursesUserQuery } from "../../../redux/features/courses/coursesApi";
import { styles } from "@/styles/style";
import { MdOutlineSmsFailed } from "react-icons/md";

interface Props {
  user: any;
}

const Profile: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([]);

  const { data, isLoading } = useGetAllCoursesUserQuery(undefined, {});

  // Below lines are not required for social auth as signOut from next auth refresh the page, therefore the query is not executed, we need to add these lines in header file, I added these lines for normal auth only.
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);

    // remove our session
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);

      setCourses(filteredCourses);
    }
  }, [data, user]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] md:w-[310px] h-[350px] dark:bg-slate-900 bg-black/5 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] dark:shadow-sm shadow-lg mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 md:px-10 md:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0 mt-20">
            {courses &&
              courses.map((course: any, index: number) => (
                <CourseCard item={course} key={index} isProfile={true} />
              ))}
          </div>
          {courses && courses.length === 0 && (
            <p
              className={`${styles.label} min-h-[50vh] flex flex-col justify-center items-center text-center gap-10`}
            >
              <MdOutlineSmsFailed className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] text-muted-foreground/30" />
              You don&apos;t have any purchased courses!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
