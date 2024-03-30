import React, { useEffect, useState } from "react";
import axios from "axios";

interface CoursePlayerProps {
  videoUrl: string;
  title: string;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=uNcPH2BcDSM2se05`}
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100% ",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        />
      )}
    </div>
  );
};

export default CoursePlayer;
