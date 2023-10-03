import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "user/signup",
        method: "post",
        body: data
      })
    }),
    logout:builder.mutation({
      query: (data) => ({
        url: "user/logout",
        method: "get"
      })
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: "user/signin",
        method: "post",
        body: data
      })
    }),
  })
});

export const { useSignupMutation,
                useLogoutMutation,
                useSigninMutation } = userApiSlice;
