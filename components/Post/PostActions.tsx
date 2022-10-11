import React from "react";

import {
  BookmarkBorderOutlined,
  ModeCommentOutlined,
  RepeatRounded,
  VisibilityOutlined,
} from "@mui/icons-material";

import styles from "./Post.module.scss";
import { Divider, IconButton } from "@mui/material";

export const PostActions = () => {
  return (
    <div className={styles.postFooter}>
      <Divider />
      <ul className={styles.postFooterInner}>
        <li>
          <IconButton>
            <ModeCommentOutlined />
          </IconButton>
          <p>2</p>
        </li>

        <li>
          <IconButton>
            <VisibilityOutlined />
          </IconButton>
          <p>2</p>
        </li>
      </ul>
    </div>
  );
};
