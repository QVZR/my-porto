import React from "react";
import { Button, Divider, Paper, Typography } from "@mui/material";

import styles from "./FullPost.module.scss";
import { PostActions } from "../Post/PostActions";
import { PersonAddAltOutlined, SmsOutlined } from "@mui/icons-material";

interface FullPostProps {
  title: string;
  text: string;
  id: number;
  views: number;
}

export const FullPost: React.FC<FullPostProps> = ({ title, text, id, views }) => {
  return (
    <Paper elevation={0} className={styles.fullPost}>
      <div>
        <Typography className={styles.title} variant="h5">
          {title}
        </Typography>
        <p>{text}</p>
        <div>
          <PostActions id={id} views={views} />
        </div>
      </div>
    </Paper>
  );
};
