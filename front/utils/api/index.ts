import axios from "axios";
import { GetServerSidePropsContext, NextPageContext } from "next";
import Cookies, { parseCookies } from "nookies";
import { CommentApi } from "./comment";
import { PostApi } from "./post";
import { UserApi } from "./user";
import { AnswerApi } from "./answer";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
  answer: ReturnType<typeof AnswerApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.token;

  const instance = axios.create({
    baseURL: process.env.URL_BACK,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    user: UserApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
    answer: AnswerApi(instance),
  };
};
