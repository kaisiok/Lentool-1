import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
// import reactCookies from 'react-cookie'

// export const setCookie = () :any => {
//   return reactCookies.set(name, value)
// }

export interface User {
  createAt: string;
  email: string;
  id: number;
  nickname: string;
  updatedAt: string;
  user_address: string;
  user_photo: string;
}

export interface UserResponse {
  data: {
    accessToken: string;
    userInfo: User;
  };
  message: string;
}

export interface LoginRequest {
  id: string;
  password: string;
}
// data: { user_posts: posts, userinfo: user }
export interface MypageResponse {
  messgae: string;
  data: {
    user_posts: [object];
    userInfo: User;
  };
}
// 회원가입 타입
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  user_address: string;
  latitude: string;
  longitude: string;
}
export interface SignupResponse {
  message: string;
}
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log("send token in headers");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials: any) => ({
        url: "users/login",
        credentials: "include", // true
        method: "POST",

        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message?: any }, void>({
      query: () => ({
        url: "users/logout",
        credentials: "include", // true
        method: "POST",
      }),
    }),
    // data: { user_posts: posts, userinfo: user }
    mypage: builder.mutation<any, void>({
      query: () => ({
        url: "users/mypage",
        credentials: "include", // true
        method: "GET",
      }),
    }),
    posts: builder.mutation<any, void>({
      query: (formdata) => ({
        url: "tools",
        credentials: "include", // true
        method: "POST",
        // headers: {
        //   'content-type': 'multipart/form-data',
        // },
        body: formdata,
        // responseHandler: (response) => response.text(),
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (setSignupData: any) => ({
        url: "users/signup",
        credentials: "include",
        method: "POST",
        body: setSignupData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useMypageMutation,
  usePostsMutation,
} = api;
