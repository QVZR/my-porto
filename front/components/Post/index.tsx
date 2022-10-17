import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import styles from "./Post.module.scss";
import Link from "next/link";
import { PostActions } from "./PostActions";

import { Api } from "../../utils/api";
import { CommentProps } from "../../utils/api/types";

interface PostProps {
  id: number;
  title: string;
  text: string;
  views: number;
}

const Post: React.FC<PostProps> = ({ title, text, id, views }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const comment = await Api().comment.getAll(id);

        setComments(comment);
      } catch (error) {
        console.warn("Fetch comment", error);
      }
    })();
  }, []);


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

        <PostActions commentCount={comments.length} id={id} views={views} />
      </Paper>
    </div>
  );
};

export default Post;
