import { MoreHorizOutlined } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { Api } from "../../utils/api";
import { AnswerProps, ResponseUser } from "../../utils/api/types";
import { AddAnswerForm } from "../AddAnswerForm";

import { Answer } from "../Answer";
import styles from "./Comment.module.scss";

export interface CommentPostProps {
  text: string;
  id: number;
  createdAt: string;
  user: ResponseUser;
  currentUserId: number | undefined;
  onRemove: (id: number) => void;
  postId: number;
}

export const Comment: React.FC<CommentPostProps> = ({
  user,
  text,
  createdAt,
  currentUserId,
  onRemove,
  id,
  postId,
}) => {
  const [openAnswerform, setOpenAnswerForm] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [answers, setAnswers] = useState<AnswerProps[]>([]);

  const onAddAnswer = async (obj: AnswerProps) => {
    const data = await Api().answer.getAllAll();
    setAnswers(data);
    setOpenAnswerForm(false);
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      const data = await Api().answer.getAllAll();
      setAnswers(data);
    };
    fetchAnswers();
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    if (window.confirm("Удалить комментарий?")) {
      try {
        await Api().comment.remove(id);
        onRemove(id);
      } catch (err) {
        console.warn("Error remove comment", err);
        alert("Не удалось удалить комментарий");
      } finally {
        handleClose();
      }
    }
  };
  const onRemoveAnswer = (id: number) => {
    setAnswers((prev) => prev.filter((obj) => obj.id !== id));
  };

  const onClickAnswer = () => {
    setOpenAnswerForm(!openAnswerform);
  };
  console.log(answers);
  return (
    <div className={styles.row}>
      <a>
        <div className={styles.title}>
          <Avatar variant="circular" alt="Avatar" className="mr-10">
            {user.fullName && user.fullName.slice(0, 1)}
          </Avatar>
          <div className={styles.titleText}>
            <b>{user.fullName}</b>
            <span>{new Date(createdAt).toLocaleString()}</span>
          </div>
        </div>
      </a>
      <Typography className={styles.text}>{text}</Typography>
      <div className={styles.buttonMenu}>
        {user.id === currentUserId && (
          <>
            {" "}
            <Button onClick={onClickAnswer} className={styles.button}>
              Ответить
            </Button>
            <Button className={(styles.button, styles.buttonDots)} onClick={handleClick}>
              <MoreHorizOutlined />
            </Button>
            {openAnswerform && <AddAnswerForm postId={postId} onAdd={onAddAnswer} commentId={id} />}
            <Menu
              anchorEl={anchorEl}
              elevation={2}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
            </Menu>
          </>
        )}
      </div>
      {answers &&
        answers
          .filter((answer) => answer.comment.id === id)
          .map((obj: AnswerProps) => (
            <Answer
              {...obj}
              key={obj.id}
              {...obj}
              id={obj.id}
              user={obj.user}
              text={obj.text}
              createdAt={obj.createdAt}
              currentUserId={currentUserId}
              onRemove={onRemoveAnswer}
            />
          ))}
      <Divider className="mt-10 mb-40" />
    </div>
  );
};
