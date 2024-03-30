import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] md:w-full md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={"/about"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href={"/privacy-policy"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={"/faq"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={"/courses"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href={"/profile"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href={"/course-dashboard"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={
                    "https://www.linkedin.com/in/pratyush-bhattacharya-9b2a30214"
                  }
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={"https://github.com/PratyushBhattacharya123"}
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://www.instagram.com/pratyush.bhattacharya?igsh=cGdtY3dvbTdybHBl"
                  }
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                <span className="font-medium text-foreground/50">
                  Call Us :
                </span>{" "}
                1800-1200-5689-2145
                <br />
                <span className="font-medium text-foreground/50">
                  Address :
                </span>{" "}
                71, Vermont Estate, Los Angeles, CA 28700
                <br />
                <span className="font-medium text-foreground/50">
                  Mail Us :
                </span>{" "}
                support@MindMatrix.com
              </p>
            </ul>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white mb-4">
          Copyright &#169; 2023 MindMatrix | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
