import { styles } from "@/styles/style";
import React from "react";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="text-justify">
      <br />
      <h1 className={`${styles.title} md:!text-[45px]`}>
        Terms and Conditions
      </h1>
      <br />
      <div className="w-[95%] md:w-[85%] m-auto">
        <p className="text-foreground/80">
          Please read these terms and conditions carefully before using our
          website (the &quot;Service&quot;) operated by MindMatrix
          (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">Accounts</h2>
        <p className="text-foreground/80">
          When you create an account with us, you must provide accurate,
          complete, and up-to-date information. Failure to do so constitutes a
          breach of the Terms, which may result in immediate termination of your
          account on our Service.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Intellectual Property
        </h2>
        <p className="text-foreground/80">
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of MindMatrix and its
          licensors. The Service is protected by copyright, trademark, and other
          laws of both the [Country] and foreign countries.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">
          Links To Other Web Sites
        </h2>
        <p className="text-foreground/80">
          Our Service may contain links to third-party websites or services that
          are not owned or controlled by MindMatrix.
        </p>

        <p className="text-foreground/80">
          MindMatrix has no control over, and assumes no responsibility for, the
          content, privacy policies, or practices of any third-party websites or
          services. You further acknowledge and agree that MindMatrix shall not
          be responsible or liable, directly or indirectly, for any damage or
          loss caused or alleged to be caused by or in connection with the use
          of or reliance on any such content, goods, or services available on or
          through any such websites or services.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">Changes</h2>
        <p className="text-foreground/80">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will try to
          provide at least 30 days&apos; notice prior to any new terms taking
          effect. What constitutes a material change will be determined at our
          sole discretion.
        </p>
        <br />
        <h2 className="md:text-[25px] text-[20px] font-semibold">Contact Us</h2>
        <p className="text-foreground/80">
          If you have any questions about these Terms, please contact us{" "}
          <span className="text-blue-600 cursor-pointer">
            <a href="mailto:pratyushbhattacharya33@gmail.com ">
              support@MindMatrix.com
            </a>
          </span>
        </p>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Policy;
