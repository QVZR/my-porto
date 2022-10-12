import { MoreHorizOutlined } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { Api } from "../../utils/api";
import { ResponseUser } from "../../utils/api/types";

import styles from "./Comment.module.scss";

export interface CommentPostProps {
  text: string;
  id: number;
  createdAt: string;
  user: ResponseUser;
  currentUserId: number | undefined;
  onRemove: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({
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

  return (
    <div className={styles.row}>
      <Link href={`/posts/${user.id}`}>
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
      </Link>
      <Typography className={styles.text}>{text}</Typography>
      <div className="d-flex align-center">
        {user.id === currentUserId && (
          <>
            {" "}
            <Button className={styles.button}>Ответить</Button>
            <Button className={(styles.button, styles.buttonDots)} onClick={handleClick}>
              <MoreHorizOutlined />
            </Button>
            <Menu
              anchorEl={anchorEl}
              elevation={2}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
              <MenuItem onClick={handleClose}>Редактировать</MenuItem>
            </Menu>
          </>
        )}
      </div>
      <Divider className="mt-30 mb-40" />
    </div>
  );
};
