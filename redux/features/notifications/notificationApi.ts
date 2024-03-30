import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allNotifications: builder.query({
      query: () => ({
        url: "get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (notificationId) => ({
        url: `update-notification/${notificationId}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useAllNotificationsQuery, useUpdateNotificationStatusMutation } =
  notificationApi;
