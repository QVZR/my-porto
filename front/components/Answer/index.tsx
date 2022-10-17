import { MoreHorizOutlined } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import React, { MouseEventHandler, useState } from "react";
import { Api } from "../../utils/api";
import { ResponseUser } from "../../utils/api/types";

import styles from "./Comment.module.scss";

export interface AnswerPostProps {
  text: string;
  id: number;
  createdAt: string;
  user: ResponseUser;
  currentUserId: number | undefined;
  onRemove: (id: number) => void;

}

export const Answer: React.FC<AnswerPostProps> = ({
  user,
  text,
  createdAt,
  currentUserId,
  onRemove,
  id,

}) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    if (window.confirm("Удалить ответ на  комментарий?")) {
      try {
        await Api().answer.remove(id);
        onRemove(id);
      } catch (err) {
        console.warn("Error remove answer", err);
        alert("Не удалось удалить ответ на комментарий");
      } finally {
        handleClose();
      }
    }
  };

  return (
    <div className={styles.row}>
      <a>
        <div className={styles.title}>
          <Avatar variant="circular" alt="Avatar" className={styles.avatar}>
            {user.fullName && user.fullName.slice(0, 1)}
          </Avatar>
          <div className={styles.titleText}>
            <b>{user.fullName}</b>
            <span>{new Date(createdAt).toLocaleString()}</span>
          </div>
          {user.id === currentUserId && (
            <Button className={(styles.button, styles.buttonDots)} onClick={handleClick}>
              <MoreHorizOutlined />
            </Button>
          )}
        </div>
      </a>
      <Typography className={styles.text}>{text}</Typography>
      <div className={styles.buttonMenu}>
        {user.id === currentUserId && (
          <>
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
    </div>
  );
};
