import { NextPage } from "next";
import { Post } from "../../components/Post";
import { useRouter } from "next/router";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Blog.module.scss";
import { Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import Link from "next/link";

const posts = [
  {
    "id": "1",
    "title": "Статья 1",
    "text": "Текст статьи 1",
  },
  {
    "id": "2",
    "title": "Статья 2",
    "text": "Текст статьи 2",
  },
  {
    "id": "3",
    "title": "Статья 3",
    "text": "Текст статьи 3",
  },
];

const Works: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <MainLayout>
        <Link href="/write">
          <a>
            <Button className={styles.headerPenButton} variant="contained">
              <AddOutlined /> Create
            </Button>
          </a>
        </Link>
        {posts.map((obj) => (
          <Post key={obj.id} id={obj.id} title={obj.title} text={obj.text} />
        ))}
      </MainLayout>
    </div>
  );
};

export default Works;
