import { styles } from "@/styles/style";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-justify">
      <br />
      <h1 className={`${styles.title} md:!text-[45px]`}>
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">
          MindMatrix
        </span>
      </h1>
      <br />
      <div className="w-[95%] md:w-[85%] m-auto">
        <p className="text-foreground/80">
          At MindMatrix, we&apos;re passionate about empowering learners to
          master the art and science of programming. Whether you&apos;re a
          novice eager to take your first steps into the world of coding or a
          seasoned developer aiming to hone your skills, we&apos;re here to
          guide you on your journey to success.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Our Mission
        </h2>
        <p className="text-foreground/80">
          Our mission is simple yet profound: to democratize access to
          high-quality programming education and foster a community of lifelong
          learners. We believe that everyone should have the opportunity to
          learn how to code, regardless of their background or circumstances.
          Through our platform, we strive to make coding education accessible,
          engaging, and enjoyable for learners of all ages and skill levels.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Why Choose MindMatrix?
        </h2>
        <ol>
          <li className="text-foreground/80">
            <span className="text-foreground/90 font-medium">
              Comprehensive Curriculum :
            </span>{" "}
            Our platform offers a comprehensive curriculum covering a wide range
            of programming languages, frameworks, and technologies.
          </li>
          <li className="text-foreground/80">
            <span className="text-foreground/90 font-medium">
              Interactive Learning Experience :
            </span>{" "}
            Learning to code doesn&apos;t have to be boring! Our interactive
            lessons, hands-on projects, and coding challenges make learning fun
            and engaging.
          </li>
          <li className="text-foreground/80">
            <span className="text-foreground/90 font-medium">
              Expert Instructors :
            </span>{" "}
            Learn from industry experts and seasoned professionals who are
            passionate about teaching and mentoring.
          </li>
          <li className="text-foreground/80">
            <span className="text-foreground/90 font-medium">
              Flexible Learning Options :
            </span>{" "}
            Choose from a variety of learning paths, courses, and schedules to
            fit your individual needs and preferences.
          </li>
          <li className="text-foreground/80">
            <span className="text-foreground/90 font-medium">
              Supportive Community :
            </span>{" "}
            Connect with fellow learners, collaborate on projects, and celebrate
            your successes together.
          </li>
        </ol>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Our Commitment to Excellence
        </h2>
        <p className="text-foreground/80">
          At MindMatrix, we are committed to excellence in everything we do.
          From the quality of our content to the responsiveness of our support
          team, we continuously strive to exceed your expectations and deliver
          an exceptional learning experience. Your success is our success, and
          we&apos;re here to support you every step of the way.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Join Us on the Journey
        </h2>
        <p className="text-foreground/80">
          Whether you&apos;re dreaming of launching your own startup, pursuing a
          career in software development, or simply expanding your horizons,
          MindMatrix is here to help you turn your aspirations into reality.
          Join us on this exciting journey of learning, growth, and discovery —
          and unlock your full potential as a programmer.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Ready to Get Started?
        </h2>
        <p className="text-foreground/80">
          Explore our courses, sign up for a free trial, and embark on your
          coding journey today. Welcome to MindMatrix — where the future of
          programming begins!
        </p>
      </div>
      <br />
      <br />
    </div>
  );
};

export default About;
