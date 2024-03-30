import React, { useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "../../../../redux/features/analytics/analyticsApi";

interface Props {
  open?: boolean;
  value?: number;
}

const CircularProgressWithLabel: React.FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: React.FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [usersComparePercentage, setUsersComparePercentage] = useState<any>();

  const { data: usersData, isLoading: usersLoading } =
    useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (usersLoading && ordersLoading) {
      return;
    } else {
      if (usersData && ordersData) {
        const usersLastTwoMonths = usersData.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonthData = usersLastTwoMonths[1].count;
          const usersPreviousMonthData = usersLastTwoMonths[0].count;
          const ordersCurrentMonthData = ordersLastTwoMonths[1].count;
          const ordersPreviousMonthData = ordersLastTwoMonths[0].count;

          const usersPercentageChange =
            ((usersCurrentMonthData - usersPreviousMonthData) /
              (usersPreviousMonthData ? usersPreviousMonthData : 1)) *
            100;

          const ordersPercentageChange =
            ((ordersCurrentMonthData - ordersPreviousMonthData) /
              (ordersPreviousMonthData ? ordersPreviousMonthData : 1)) *
            100;

          setUsersComparePercentage({
            currentMonth: usersCurrentMonthData,
            previousMonth: usersPreviousMonthData,
            percentageChange: usersPercentageChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonthData,
            previousMonth: ordersPreviousMonthData,
            percentageChange: ordersPercentageChange,
          });
        }
      }
    }
  }, [ordersData, usersData, ordersLoading, usersLoading]);

  return (
    <div className="mt-[30px] h-auto flex flex-col">
      <div className="w-full flex">
        <div className="w-[75%] -z-10">
          <div className="p-8">
            <UserAnalytics isDashboard={true} />
          </div>
        </div>
        <div className="pt-[80px] pr-8 w-[25%]">
          <div className="w-full dark:bg-[#111C43] h-[18vh] rounded-sm shadow">
            <div className="flex items-center px-5 pt-3 justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {ordersComparePercentage?.currentMonth -
                    ordersComparePercentage?.previousMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-normal">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    ordersComparePercentage?.percentageChange > 100
                      ? 100
                      : ordersComparePercentage?.percentageChange
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {ordersComparePercentage?.percentageChange > 0 ? "+" : "-"}
                  {ordersComparePercentage?.percentageChange.toFixed(2)}%
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-6 h-[18vh]">
            <div className="flex items-center px-5 pt-3 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {usersComparePercentage?.currentMonth -
                    usersComparePercentage?.previousMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-normal">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    usersComparePercentage?.percentageChange > 100
                      ? 100
                      : usersComparePercentage?.percentageChange
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {usersComparePercentage?.percentageChange > 0 ? "+" : "-"}
                  {usersComparePercentage?.percentageChange.toFixed(2)}%
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex mt-[-20px]">
        <div className="w-[65%]">
          <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40px] shadow-sm m-auto">
            <OrdersAnalytics isDashboard={true} />
          </div>
        </div>

        <div className="p-5 w-[35%]">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-normal font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
