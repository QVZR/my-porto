import { NextPage } from "next";
import Post from "../../components/Post";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Blog.module.scss";
import { Button, Paper } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import Link from "next/link";
import { Api } from "../../utils/api";
import { PostProps } from "../../utils/api/types";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/slices/user";
import { useSession } from "next-auth/react";

interface HomeProps {
  posts: PostProps[];
}

const Works: NextPage<HomeProps> = ({ posts }) => {
  const { data: session } = useSession();

  const isAuth = useSelector(isAuthSelector) || session;

  return (
    <div className={styles.wrapper}>
      <MainLayout>
        <Link href="/write">
          <a>
            <Button disabled={!isAuth} className={styles.headerPenButton} variant="contained">
              <AddOutlined /> Create
            </Button>
          </a>
        </Link>
        {!isAuth && (
          <Paper className={styles.headerNotation} elevation={0}>
            Please login or register to create, edit posts and comment on posts
          </Paper>
        )}
        {posts.map((obj) => (
          <Post
            {...obj}
            key={obj.id}
            id={obj.id}
            title={obj.title}
            text={obj.text}
            views={obj.views}
          />
        ))}
      </MainLayout>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const posts = await Api().post.getAll();

    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      posts: null,
    },
  };
};

export default Works;
