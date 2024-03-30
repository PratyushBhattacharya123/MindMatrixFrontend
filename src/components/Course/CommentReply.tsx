import Image from "next/image";
import React, { useState } from "react";
import { format } from "timeago.js";
import defaultAvatar from "../../../public/Avatar.png";
import { BiMessage } from "react-icons/bi";
import { SendHorizonalIcon } from "lucide-react";
import { MdVerified } from "react-icons/md";

type Props = {
  data: any;
  activeVideo: number;
  answer: string;
  setAnswer: (answer: string) => void;
  handleAnswerSubmit: any;
  user: any;
  setQuestionId: any;
  answerLoading: boolean;
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerLoading,
}: Props) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((question: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            item={question}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            setQuestionId={setQuestionId}
            answerLoading={answerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item?.user?.avatar ? item?.user?.avatar.url : defaultAvatar}
              alt=""
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item.user.name}</h5>
            <p>{item.question}</p>
            <small className="text-muted-foreground">
              {format(item.createdAt)}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="pl-[52px] text-muted-foreground cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-muted-foreground mt-1"
          />
          <span className="pl-1 cursor-pointer text-muted-foreground">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="md:w-full flex ml-12 md:ml-16 my-5" key={item}>
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
                        <MdVerified size={18} className="text-blue-700 mt-1" />
                      )}
                    </div>
                  </h5>
                  <p className="md:text-inherit text-[14px]">{item.answer}</p>
                  <small className="text-muted-foreground">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block ml-12 mt-2 outline-none bg-transparent border-b border-muted-foreground p-[5px] w-[95%]"
                />
                <button
                  type="submit"
                  className={`absolute right-0 bottom-[6px] cursor-pointer ${
                    (answerLoading || answer === "") &&
                    "opacity-70 cursor-not-allowed"
                  }`}
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerLoading}
                >
                  <SendHorizonalIcon size={25} className="text-green-500" />
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CommentReply;
