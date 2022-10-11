import React from "react";
import { Button, Divider, Paper, Typography } from "@mui/material";

import styles from "./FullPost.module.scss";
import { PostActions } from "../Post/PostActions";
import { PersonAddAltOutlined, SmsOutlined } from "@mui/icons-material";
import { OutputBlockData } from "@editorjs/editorjs";

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
        <div className={styles.userInfo}>
          <div className="d-flex align-center">
            <img src="https://avatarko.ru/img/avatar/2/zhivotnye_igra_kot_1816.jpg" alt="Avatar" />
            <b>Василий Некудышный</b>
          </div>
          <div>
            <Button
              className={styles.subscribe}
              variant="contained"
              style={{ height: 40, minWidth: 55 }}
            >
              <SmsOutlined /> Комментировать
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};
