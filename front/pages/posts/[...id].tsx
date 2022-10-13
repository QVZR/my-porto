import { ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { ApiError } from "next/dist/server/api-utils";
import Link from "next/link";
import React from "react";

import { FullPost } from "../../components/FullPost";
import { PostComments } from "../../components/PostComments";

import { MainLayout } from "../../layouts/MainLayout";
import { Api } from "../../utils/api";
import { PostProps } from "../../utils/api/types";

import styles from "./Slug.module.scss";

interface SlugProps {
  post: PostProps;
}

const Slug: NextPage = ({}) => {
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
        <FullPost title="title 1" blocks={[]} />
        <PostComments postId={1} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id;
    const post = await Api(ctx).post.getOne(+(id as string));

    return {
      props: { post },
    };
  } catch (error) {
    console.log("Full post page", error);
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default Slug;
