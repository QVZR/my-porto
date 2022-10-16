import { Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddCommentForm } from "../AddCommentForm";
import { Comment } from "../Comment";

import styles from "./PostComments.module.scss";
import { CommentProps } from "../../utils/api/types";
import { selectUserData } from "../../redux/slices/user";
import { useAppSelector } from "../../redux/hooks";
import { useComments } from "../../hooks/useComments";

import { useDispatch, useSelector } from "react-redux";
import { selectCommentsData, setCommentData } from "../../redux/slices/comments";
import { Api } from "../../utils/api";

export interface PostCommentProps {
  postId: number;
  commentCount: number;
}

export const PostComments: React.FC<PostCommentProps> = ({ postId, commentCount }) => {
  const dispatch = useDispatch();
  const userData = useAppSelector(selectUserData);
  const [activeTab, setActiveTab] = useState(0);
  const { comments, setComments } = useComments(postId);

  const onAddComment = (obj: CommentProps) => {
    setComments((prev) => [obj, ...prev]);
    dispatch(setCommentData(obj));
  };

  const onRemoveComment = (id: number) => {
    setComments((prev) =>
      prev.filter((obj) => {
        dispatch(setCommentData(obj));
        return obj.id !== id;
      })
    );
  };

  return (
    <Paper elevation={0} className={styles.commentForm}>
      <Typography variant="h6"> {comments.length || commentCount} comments</Typography>
      <Tabs
        onChange={(_, newValue) => setActiveTab(newValue)}
        className="mt-20"
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Популярные" />
        <Tab label="По порядку" />
      </Tabs>

      <Divider className={styles.divider} />

      {userData && <AddCommentForm onAdd={onAddComment} postId={postId} />}

      {comments.length ? (
        comments.map((obj) => (
          <Comment
            {...obj}
            key={obj.id}
            id={obj.id}
            user={obj.user}
            text={obj.text}
            createdAt={obj.createdAt}
            currentUserId={userData?.id}
            onRemove={onRemoveComment}
            postId={postId}
          />
        ))
      ) : (
        <div className="pb-30 text-center">Пока нет комментариев, напиши первым ...</div>
      )}
    </Paper>
  );
};
