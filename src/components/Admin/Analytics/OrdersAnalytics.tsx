import React from "react";
import { useGetOrdersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomLoader from "@/components/global/CustomLoader";
import { styles } from "@/styles/style";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders &&
    data.orders.last12Months.forEach((item: any) =>
      analyticsData.push({ name: item.month, count: item.count })
    );

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div
          className={`${
            isDashboard ? "h-[35vh]" : "h-[80vh]"
          } dark:bg-[#111C43]`}
        >
          <div
            className={`${isDashboard ? "!mt-0 mb-2 pl-[40px] " : "mt-[50px]"}`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "50%" : "60%"}
            >
              <LineChart
                data={analyticsData}
                height={300}
                width={500}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {isDashboard && <Legend />}
                <Line
                  dataKey="count"
                  fill="#4d62d9"
                  stroke="#82ca9d"
                  type={"monotone"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
