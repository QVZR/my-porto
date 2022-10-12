import { Paper, Typography } from "@mui/material";
import React from "react";

import styles from "./Post.module.scss";
import Link from "next/link";
import { PostActions } from "./PostActions";

interface PostProps {
  id: string;
  title: string;
  text: string;
}

export const Post: React.FC<PostProps> = ({ title, text, id }) => {
  return (
    <div className={styles.post}>
      <Paper elevation={0} className={styles.postInner} classes={{ root: styles.paper }}>
        <Link href={`/posts/${id}`}>
          <a>
            <Typography variant="h5" className={styles.title}>
              {title}
            </Typography>
          </a>
        </Link>
        <Typography className={styles.text}>{text}</Typography>

        <PostActions />
      </Paper>
    </div>
  );
};
