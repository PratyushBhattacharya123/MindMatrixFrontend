import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import { styles } from "@/styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveOuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveOuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] md:w-[80%] m-auto mt-4 mb-10">
      <h1 className={`${styles.title} md:text-[40px]`}>
        Frequently Asked Questions
      </h1>
      <div className="md:mt-8">
        <dl className="space-y-8">
          {questions.map((q: any) => (
            <div
              key={q._id}
              className={`${
                q._id !== questions[0]?._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span className="font-medium text-black dark:text-white">
                    {q.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q._id ? (
                      <HiMinus className="w-6 h-6" />
                    ) : (
                      <HiPlus className="w-6 h-6" />
                    )}
                  </span>
                </button>
              </dt>
              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins text-foreground/70">
                    {q.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
