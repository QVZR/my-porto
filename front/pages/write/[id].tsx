import { ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { WriteForm } from "../../components/WtiteForm";
import { MainLayout } from "../../layouts/MainLayout";
import { Api } from "../../utils/api";
import { PostProps } from "../../utils/api/types";

import styles from "../posts/Slug.module.scss";

interface WritePageProps {
  post: PostProps;
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
  return (
    <MainLayout>
      <Link href="/blog">
        <a>
          <Button className={styles.headerPenButton} variant="contained">
            <ArrowBackOutlined /> Back
          </Button>
        </a>
      </Link>
      <WriteForm data={post} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id;
    const post = await Api(ctx).post.getOne(+(id as string));
    const user = await Api(ctx).user.getMe();

    if (post.user.id !== user.id) {
      return {
        props: {},
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: { post },
    };
  } catch (error) {
    console.log("write page", error);
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default WritePage;
