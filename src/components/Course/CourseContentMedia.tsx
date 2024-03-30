import CoursePlayer from "@/lib/utils/CoursePlayer";
import { styles } from "@/styles/style";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../../../public/Avatar.png";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
} from "../../../redux/features/courses/coursesApi";
import Loading from "../global/Loader";
import CommentReply from "./CommentReply";
import Ratings from "@/lib/utils/Ratings";
import { format } from "timeago.js";
import { MdVerified } from "react-icons/md";
import { SendHorizonalIcon } from "lucide-react";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  reviews: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  reviews,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reviewReply, setReviewReply] = useState("");

  const [
    addNewQuestion,
    { isLoading: questionCreationLoading, error, isSuccess },
  ] = useAddNewQuestionMutation({});

  const [
    addAnswerInQuestion,
    { isLoading: answerLoading, error: answerError, isSuccess: answerSuccess },
  ] = useAddAnswerInQuestionMutation({});

  const [
    addReviewInCourse,
    { isLoading: reviewLoading, error: reviewError, isSuccess: reviewSuccess },
  ] = useAddReviewInCourseMutation({});

  const [
    addReplyInReview,
    {
      isLoading: reviewReplyLoading,
      error: reviewReplyError,
      isSuccess: reviewReplySuccess,
    },
  ] = useAddReplyInReviewMutation({});

  const isReviewExists = reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty!");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });
      addNewQuestion({
        question,
        courseId: id,
        contentId: data?.[activeVideo]?._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    if (answer.length === 0) {
      toast.error("Answer cannot be empty!");
    } else {
      console.log({
        answer,
        courseId: id,
        contentId: data?.[activeVideo]?._id,
        questionId,
      });
      addAnswerInQuestion({
        answer,
        courseId: id,
        contentId: data?.[activeVideo]?._id,
        questionId,
      });
    }
  };

  const handleReviewSubmit = async () => {
    if (review === "") {
      toast.error("Review cannot be empty!");
    } else {
      console.log({
        courseId: id,
        review,
        rating,
      });
      addReviewInCourse({
        courseId: id,
        review,
        rating,
      });
    }
  };

  const handleReviewReplySubmit = async () => {
    if (reviewReply === "") {
      toast.error("Review reply cannot be empty!");
    } else {
      console.log({
        comment: reviewReply,
        courseId: id,
        reviewId,
      });
      addReplyInReview({
        comment: reviewReply,
        courseId: id,
        reviewId,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question Added Successfully!");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data?.[activeVideo]?.title}`,
        userId: user?._id,
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer Added Successfully!");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply in ${data?.[activeVideo]?.title}`,
          userId: user?._id,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorData = answerError as any;
        toast.error(errorData.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      refetch();
      toast.success("Review Added Successfully!");
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review in ${id}`,
        userId: user._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorData = reviewError as any;
        toast.error(errorData.data.message);
      }
    }
    if (reviewReplySuccess) {
      setReviewReply("");
      refetch();
      toast.success("Review Reply Added Successfully!");
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorData = reviewReplyError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    reviewReplySuccess,
    reviewReplyError,
  ]);

  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data?.[activeVideo].title}
        videoUrl={data?.[activeVideo].videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3 mt-4">
        <div
          className={`flex items-center justify-center !bg-blue-600 h-[40px] w-[40px] rounded-full !py-[unset] cursor-pointer ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.5]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <div className="flex items-center justify-center !text-white">
            <AiOutlineArrowLeft size={20} className="font-bold" />
          </div>
        </div>
        <div
          className={`flex items-center justify-center !bg-blue-600 h-[40px] w-[40px] rounded-full !py-[unset] cursor-pointer ${
            activeVideo === data?.length - 1 && "!cursor-no-drop opacity-[0.5]"
          }`}
          onClick={() =>
            setActiveVideo(
              activeVideo === data.length - 1 ? activeVideo : activeVideo + 1
            )
          }
        >
          <div className="flex items-center justify-center !text-white">
            <AiOutlineArrowRight size={20} className="font-bold" />
          </div>
        </div>
      </div>
      <h1 className="pt-2 md:text-[25px] text-[20px] font-semibold">
        {data?.[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            className={`md:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
            key={index}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[14px] md:text-[18px] whitespace-pre-line mb-3">
          {data?.[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data?.[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="md:text-[20px] md:inline-block">
                {item.title && item.title + " : "}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] text-[12px] md:text-[20px] md:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : defaultAvatar}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <Textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Enter your question..."
              className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-muted-foreground/30 shadow-md md:w-full p-2 rounded w-[90%] md:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[35%] !h-[35px] md:!w-[120px] !bg-blue-600 !text-white md:!h-[40px] md:!text-[18px] mt-5 flex items-center justify-center text-[14px] ${
                reviewLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              {questionCreationLoading ? <Loading /> : "Submit"}
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-muted-foreground/30" />
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerLoading={answerLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <>
          {!isReviewExists && user.role === "user" && (
            <>
              <div className="w-full flex">
                <Image
                  src={user?.avatar ? user?.avatar?.url : defaultAvatar}
                  alt=""
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px] font-medium">
                    Give a Rating <span className="!text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246, 186, 0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246, 186, 0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <Textarea
                    name=""
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id=""
                    cols={40}
                    rows={5}
                    placeholder="Write your comment..."
                    className="outline-none bg-transparent md:ml-3 border dark:border-[#ffffff57] border-muted-foreground/30 shadow-md md:w-full p-2 rounded w-[90%] md:text-[18px] font-Poppins"
                  />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div
                  className={`${
                    styles.button
                  } !w-[35%] !h-[35px] md:!w-[120px] !bg-blue-600 !text-white md:!h-[40px] md:!text-[18px] mt-5 flex items-center justify-center mr-6 text-[14px] md:mr-0 ${
                    reviewLoading && "cursor-not-allowed"
                  }`}
                  onClick={handleReviewSubmit}
                >
                  {reviewLoading ? <Loading /> : "Submit"}
                </div>
              </div>
            </>
          )}
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-muted-foreground/30" />
          <div className="w-full">
            {reviews &&
              reviews.reverse().map((item: any, index: number) => (
                <div className="w-full my-5" key={index}>
                  <div className="w-full flex">
                    <div>
                      <Image
                        src={
                          item?.user?.avatar
                            ? item?.user?.avatar.url
                            : defaultAvatar
                        }
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                    </div>
                    <div className="pl-3">
                      <h5 className="text-[20px]">{item?.user?.name}</h5>
                      <div className="-ml-[10px]">
                        <Ratings rating={item?.rating} />
                        <div className="ml-3">
                          <p>{item?.comment}</p>
                          <small className="text-muted-foreground">
                            {format(item?.createdAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <>
                    <div className="w-full flex ml-[2px]">
                      <span
                        className="pl-[52px] text-muted-foreground cursor-pointer mr-2"
                        onClick={() => {
                          setIsReviewReply(!isReviewReply);
                          setReviewId(item._id);
                        }}
                      >
                        {!isReviewReply
                          ? item.commentReplies.length === 0
                            ? "Add Reply"
                            : "View Reply"
                          : "Hide Reply"}
                      </span>
                    </div>
                    {isReviewReply && (
                      <>
                        {item.commentReplies.map((item: any) => (
                          <div
                            className="md:w-full flex ml-12 md:ml-16 my-5"
                            key={item}
                          >
                            <div>
                              <Image
                                src={
                                  item?.user?.avatar
                                    ? item?.user?.avatar.url
                                    : defaultAvatar
                                }
                                alt=""
                                width={40}
                                height={40}
                                className="w-[40px] h-[40px] rounded-full object-cover"
                              />
                            </div>
                            <div className="pl-2">
                              <h5 className="md:text-[20px] text-[14px]">
                                <div className="flex gap-1 items-center">
                                  {item.user.name}
                                  {item.user.role === "admin" && (
                                    <MdVerified
                                      size={18}
                                      className="text-blue-700 mt-1"
                                    />
                                  )}
                                </div>
                              </h5>
                              <p className="md:text-inherit text-[14px]">
                                {item.comment}
                              </p>
                              <small className="text-muted-foreground">
                                {format(item.createdAt)}
                              </small>
                            </div>
                          </div>
                        ))}
                        <>
                          {item.commentReplies.length === 0 && (
                            <>
                              {user.role === "admin" && (
                                <div className="w-full flex relative">
                                  <input
                                    type="text"
                                    placeholder="Enter your reply..."
                                    value={reviewReply}
                                    onChange={(e) =>
                                      setReviewReply(e.target.value)
                                    }
                                    className="block ml-12 mt-2 outline-none bg-transparent border-b border-muted-foreground p-[5px] w-[95%]"
                                  />
                                  <button
                                    type="submit"
                                    className={`absolute right-0 bottom-[6px] cursor-pointer ${
                                      (reviewReplyLoading ||
                                        reviewReply === "") &&
                                      "opacity-70 cursor-not-allowed"
                                    }`}
                                    onClick={handleReviewReplySubmit}
                                    disabled={
                                      reviewReply === "" || reviewReplyLoading
                                    }
                                  >
                                    <SendHorizonalIcon
                                      size={25}
                                      className="text-green-500"
                                    />
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      </>
                    )}
                  </>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseContentMedia;
