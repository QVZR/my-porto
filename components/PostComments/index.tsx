import { Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddCommentForm } from "../AddCommentForm";
import { Comment } from "../Comment";

import styles from "./PostComments.module.scss";
// import { Api } from "../../utils/api";
// import { CommentProps } from "../../utils/api/types";
// import { selectUserData } from "../../redux/slices/user";
// import { useAppSelector } from "../../redux/hooks";
// import { useComments } from "../../hooks/useComments";

export interface PostCommentProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentProps> = ({ postId }) => {
  // const userData = useAppSelector(selectUserData);
  const [activeTab, setActiveTab] = useState(0);
  // const { comments, setComments } = useComments(postId);

  // const onAddComment = (obj: CommentProps) => {
  //   setComments((prev) => [...prev, obj]);
  // };

  // const onRemoveComment = (id: number) => {
  //   setComments((prev) => prev.filter((obj) => obj.id !== id));
  // };

  return (
    <Paper elevation={0} className="mt-40 pt-30 pr-30 pl-30">
      <Typography variant="h6">42 комментария</Typography>
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

      {/* <AddCommentForm postId={postId} /> */}
      {/* 
      {comments.length ? (
        comments.map((obj) => (
          <Comment
            key={obj.id}
            {...obj}
            id={obj.id}
            user={obj.user}
            text={obj.text}
            createdAt={obj.createdAt}
            currentUserId={userData?.id}
            onRemove={onRemoveComment}
          />
        ))
      ) : (
        <div className="pb-30 text-center">Пока нет комментариев, напиши первым ...</div>
      )} */}
    </Paper>
  );
};
