import React, { useEffect, useState } from "react";
import { IconButton, Paper, Typography } from "@mui/material";

import styles from "./FullPost.module.scss";
import { PostActions } from "../Post/PostActions";
import { ClearOutlined, Edit } from "@mui/icons-material";
import Link from "next/link";
import { Api } from "../../utils/api";
import { useRouter } from "next/router";
import { CommentProps } from "../../utils/api/types";
import { selectCommentsData } from "../../redux/slices/comments";
import { useAppSelector } from "../../redux/hooks";
import ReactMarkdown from "react-markdown";

interface FullPostProps {
  title: string;
  text: string;
  id: number;
  views: number;
  userId: number;
  postUserId: number;
  comments: CommentProps;
}

export const FullPost: React.FC<FullPostProps> = ({
  title,
  text,
  id,
  views,
  userId,
  postUserId,
}) => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const commentData = useAppSelector(selectCommentsData);

  const onClickRemove = async () => {
    if (window.confirm("Are you sure you want to delete the article?")) {
      // dispatch(fetchRemovePost(id));
      await Api().post.remove(id);
      router.push("/blog/");
    }
  };
  useEffect(() => {
    if (userId === postUserId) {
      setIsEditable(true);
    }
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const comment = await Api().comment.getAll(id);

        setComments(comment);
      } catch (error) {
        console.warn("Fetch comment", error);
      }
    })();
  }, [commentData]);

  return (
    <Paper elevation={0} className={styles.fullPost}>
      <div>
        <Typography className={styles.title} variant="h5">
          {title}
        </Typography>
        {isEditable && (
          <div className={styles.editButtons}>
            <Link href={`/write/${id}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <ClearOutlined />
            </IconButton>
          </div>
        )}

        <ReactMarkdown>{text}</ReactMarkdown>

        <div>
          <PostActions id={id} views={views} commentCount={comments.length} />
        </div>
      </div>
    </Paper>
  );
};
