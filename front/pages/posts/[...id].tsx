import { ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";

import { FullPost } from "../../components/FullPost";
import { PostComments } from "../../components/PostComments";

import { MainLayout } from "../../layouts/MainLayout";
import { Api } from "../../utils/api";
import { CommentProps, PostProps, ResponseUser } from "../../utils/api/types";

import styles from "./Slug.module.scss";

interface SlugProps {
  post: PostProps;
  user: ResponseUser;
  comments: any;
}

const Slug: NextPage<SlugProps> = ({ post, user, comments }) => {
  return (
    <MainLayout>
      {" "}
      <Link href="/blog">
        <a>
          <Button className={styles.headerPenButton} variant="contained">
            <ArrowBackOutlined /> Back
          </Button>
        </a>
      </Link>
      <div className={styles.slugRow}>
        <FullPost
          title={post.title}
          text={post.text}
          id={post.id}
          views={post.views}
          userId={user ? user.id : 999999999999999999999}
          postUserId={post.user.id}
          comments={comments}
        />
        <PostComments commentCount={comments.length} postId={post.id} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id;
    const post = await Api(ctx).post.getOne(+(id as string));
    const user = await Api(ctx).user.getMe();
    const comments = await Api(ctx).comment.getAll(post.id);

    return {
      props: { post, user, comments },
    };
  } catch (error) {
    console.log("Full post page", error);
    const id = ctx.params?.id;
    const post = await Api(ctx).post.getOne(+(id as string));
    const comments = await Api(ctx).comment.getAll(post.id);
    return {
      props: { post, comments },
    };
  }
};

export default Slug;
