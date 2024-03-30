import React, { useEffect, useState } from "react";
import { ModeToggle } from "../global/mode-toggle";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import {
  useAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/features/notifications/notificationApi";
import { format } from "timeago.js";
import { MdOutlineSmsFailed } from "react-icons/md";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader = ({ open, setOpen }: Props) => {
  const { data, refetch } = useAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation({});

  const [notifications, setNotifications] = useState<any>([]);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dmffc94ez/video/upload/v1711702943/Notification_Sound_tydige.mp3"
    )
  );

  const playNotificationWithSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter(
          (notification: any) => notification.status === "unread"
        )
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationWithSound();
    });
  }, [refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-6">
      <ModeToggle />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        {notifications && notifications.length !== 0 && (
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications && notifications.length}
          </span>
        )}
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-[72px] rounded overflow-hidden">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3 font-semibold">
            Notifications
          </h5>
          <div className="overflow-y-scroll h-[85%]">
            {notifications && notifications.length === 0 && (
              <div className="h-[80%] w-full flex items-center justify-center flex-col gap-6 text-muted-foreground">
                <MdOutlineSmsFailed className="h-[100px] w-[100px] !text-muted-foreground/30" />
                No Notifications!
              </div>
            )}
            {notifications &&
              notifications.map((item: any, index: number) => (
                <div
                  className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] px-2"
                  key={index}
                >
                  <div className="w-full flex items-center justify-between p-2 text-[14px]">
                    <p className="text-black dark:text-white">{item.title}</p>
                    <p
                      className="text-blue-500/70 cursor-pointer"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className="px-2 text-black dark:text-white/70">
                    {item.message}
                  </p>
                  <p className="p-2 text-muted-foreground text-[12px]">
                    {format(item.createdAt)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
