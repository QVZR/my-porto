import React from "react";
import { Button, Divider, Paper, Typography } from "@mui/material";

import styles from "./FullPost.module.scss";
import { PostActions } from "../Post/PostActions";
import { PersonAddAltOutlined, SmsOutlined } from "@mui/icons-material";
// import { OutputBlockData } from "@editorjs/editorjs";

interface FullPostProps {
  title: string;
  blocks: OutputBlockData[];
}

export const FullPost: React.FC<FullPostProps> = ({ title, blocks }) => {
  return (
    <Paper elevation={0} className={styles.fullPost}>
      <div>
        <Typography className={styles.title} variant="h5">
          {title}
        </Typography>

        {blocks.map((obj) => (
          <Typography key={obj.id} dangerouslySetInnerHTML={{ __html: obj.data.text }}></Typography>
        ))}
        <div>
          <PostActions />
        </div>
    
      </div>
    </Paper>
  );
};
