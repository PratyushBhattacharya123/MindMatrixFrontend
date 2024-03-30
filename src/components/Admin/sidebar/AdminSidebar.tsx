"use client";

import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrorBackIosIcon,
  BarChartOutlinedIcon,
  ExitToAppIcon,
  GroupsIcon,
  ManageHistoryIcon,
  MapOutlinedIcon,
  OndemandVideoIcon,
  PeopleOutlinedIcon,
  QuizIcon,
  ReceiptOutlinedIcon,
  SettingsIcon,
  VideoCallIcon,
  WebIcon,
  WysiwygIcon,
} from "../../global/icon-helper";

import avatarDefault from "../../../../public/Avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: React.FC<itemProps> = ({
  icon,
  selected,
  setSelected,
  title,
  to,
}) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography
        className={`!text-[16px] !font-Poppins ${
          !selected && "text-black/70 dark:text-muted-foreground"
        }`}
      >
        {title}
      </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#f2f2f2 !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins font-semibold dark:text-white text-black">
                    MindMatrix
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block hover:!bg-transparent"
                >
                  <ArrorBackIosIcon className="text-black dark:text-[#ffffffc1] hover:!text-[#868dfb]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  alt="Profile-user"
                  height={100}
                  width={100}
                  style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffba]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize"
                  sx={{ m: "10px 0 0 0" }}
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data Section Start */}
            <Typography
              variant="h5"
              className={`!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-medium ${
                !isCollapsed && "mt-4"
              }`}
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Data section End */}

            {/* Content Section Start */}
            <Typography
              variant="h5"
              className={`!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-medium ${
                !isCollapsed && "mt-4"
              }`}
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Content section End */}

            {/* Customization Section Start */}
            <Typography
              variant="h5"
              className={`!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-medium ${
                !isCollapsed && "mt-4"
              }`}
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Customization section End */}

            {/* Controllers Section Start */}
            <Typography
              variant="h5"
              className={`!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-medium ${
                !isCollapsed && "mt-4"
              }`}
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Controllers Section End */}

            {/* Analytics Section Start */}
            <Typography
              variant="h5"
              className={`!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-medium ${
                !isCollapsed && "mt-4"
              }`}
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Analytics section End */}

            {/* Extras Section Start */}
            <Typography
              variant="h5"
              className={`!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-medium ${
                !isCollapsed && "mt-4"
              }`}
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Logout"
              to="/logout"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Extras section End */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
