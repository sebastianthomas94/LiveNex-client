import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "user/signup",
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: "user/logout",
        method: "get",
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: "user/signin",
        method: "post",
        body: data,
      }),
    }),
    sentReply: builder.mutation({
      query: (data) => ({
        url: "user/reply",
        method: "post",
        body: data,
      }),
    }),
    isSubscribed: builder.mutation({
      query: () => ({
        url: "user/issubscribed",
        method: "get",
      }),
    }),
    razporpay: builder.mutation({
      query: (params) => ({
        url: "user/razor/orders",
        method: "get",
        params,
      }),
    }),
    razporPaySuccess: builder.mutation({
      query: (data) => ({
        url: "user/razor/success",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLogoutMutation,
  useSigninMutation,
  useSentReplyMutation,
  useIsSubscribedMutation,
  useRazporpayMutation,
  useRazporPaySuccessMutation,
} = userApiSlice;
