import { styles } from "@/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

const reviews = [
  {
    name: "John Doe",
    avatar: "../../../public/avatars/2.png",
    profession: "Software Engineer | USA",
    comment:
      "Excellent content! Engaging lectures and practical exercises helped me grasp complex concepts easily.",
  },
  {
    name: "Emily Smith",
    avatar: "../../../public/avatars/3.png",
    profession: "Frontend Developer | Canada",
    comment:
      "Fantastic instructor! Clear explanations and hands-on projects made learning enjoyable.",
  },
  {
    name: "Michael Johnson",
    avatar: "../../../public/avatars/4.png",
    profession: "Backend Developer | UK",
    comment:
      "Impressive course structure! Well-paced and comprehensive. A must-take for aspiring developers.",
  },
  {
    name: "Sophia Brown",
    avatar: "../../../public/avatars/5.png",
    profession: "UI/UX Designer | Australia",
    comment:
      "Loved the practical focus of the course. Real-world projects helped solidify my skills.",
  },
  {
    name: "David Miller",
    avatar: "../../../public/avatars/6.png",
    profession: "DevOps Engineer | Germany",
    comment:
      "Informative lectures! Learned a lot about deployment and server-side programming.",
  },
  {
    name: "Lily Anderson",
    avatar: "../../../public/avatars/7.png",
    profession: "Product Manager | France",
    comment:
      "Highly impressed! The course content was relevant and up-to-date with industry standards.",
  },
  {
    name: "Daniel Wilson",
    avatar: "../../../public/avatars/8.png",
    profession: "Data Scientist | Brazil",
    comment:
      "Valuable insights! Explored various data analysis techniques applicable to web development.",
  },
  {
    name: "Emma Martinez",
    avatar: "../../../public/avatars/9.png",
    profession: "Software Tester | Spain",
    comment:
      "Great support! The instructor was responsive to questions and provided helpful guidance.",
  },
  {
    name: "Noah Thompson",
    avatar: "../../../public/avatars/10.png",
    profession: "Cybersecurity Analyst | Japan",
    comment:
      "Thorough coverage! Explored security best practices and techniques extensively.",
  },
  {
    name: "Olivia Garcia",
    avatar: "../../../public/avatars/11.png",
    profession: "Technical Writer | India",
    comment:
      "Well-structured course! Easy to follow and understand, even for beginners.",
  },
  {
    name: "William Rodriguez",
    avatar: "../../../public/avatars/12.png",
    profession: "Project Manager | USA",
    comment:
      "Beneficial content! Gained insights into project management aspects of web development.",
  },
  {
    name: "Ava Hernandez",
    avatar: "../../../public/avatars/13.png",
    profession: "Business Analyst | Canada",
    comment:
      "Informative lectures! Explored the business side of web development in depth.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] md:w-[85%] m-auto">
      <div className="w-full md:flex items-center">
        <div className="md:w-[50%] w-full">
          <Image
            src={require("../../../public/Cartoon.png")}
            alt="Business"
            width={700}
            height={700}
          />
        </div>
        <div className="md:w-[50%] w-full">
          <h3 className={`${styles.title} md:!text-[40px]`}>
            Our Students Are{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">
              Our Strength
            </span>{" "}
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label} ml-6`}>
            Discover the transformative journey of our students through their
            inspiring testimonials. Dive into their stories and see how our
            courses have empowered them to achieve their dreams and unlock their
            full potential in the world of technology.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px]md:[&>*:nth-child(6)]:!mt-[-40px] mt-10">
        {reviews &&
          reviews.map((review, index) => (
            <ReviewCard item={review} index={index} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
