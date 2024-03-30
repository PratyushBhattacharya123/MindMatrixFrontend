import React from "react";
import { useGetUsersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import CustomLoader from "@/components/global/CustomLoader";
import { styles } from "@/styles/style";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  isDashboard?: boolean;
}

// const analyticsData = [
//   { name: "January 2023", count: 440 },
//   { name: "February 2023", count: 2440 },
//   { name: "March 2023", count: 450 },
//   { name: "April 2023", count: 4540 },
//   { name: "May 2023", count: 5325 },
//   { name: "June 2023", count: 53 },
//   { name: "July 2023", count: 532 },
//   { name: "August 2023", count: 5454 },
//   { name: "September 2023", count: 346 },
//   { name: "October 2023", count: 454 },
//   { name: "November 2023", count: 144 },
//   { name: "December 2023", count: 4637 },
// ];

const UserAnalytics: React.FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users &&
    data.users.last12Months.forEach((item: any) =>
      analyticsData.push({ name: item.month, count: item.count })
    );

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div
          className={`${
            isDashboard ? "" : "shadow-sm pb-5"
          } mt-[50px] dark:bg-[#111C43] rounded-sm`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "50%" : "60%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  dataKey="count"
                  fill="#4d62d9"
                  stroke="#4d62e9"
                  type={"monotone"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
