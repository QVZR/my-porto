import React from "react";

import {
  BookmarkBorderOutlined,
  ModeCommentOutlined,
  RepeatRounded,
  VisibilityOutlined,
} from "@mui/icons-material";

import styles from "./Post.module.scss";
import { Divider, IconButton } from "@mui/material";
import Link from "next/link";

export const PostActions = ({ id }) => {
  return (
    <div className={styles.postFooter}>
      <Divider />
      <ul className={styles.postFooterInner}>
        <li>
          <Link href={`/posts/${id}`}>
            <a>
              <IconButton>
                <ModeCommentOutlined />
              </IconButton>
            </a>
          </Link>
          <p>2</p>
        </li>

        <li>
          <VisibilityOutlined />

          <p>2</p>
        </li>
      </ul>
    </div>
  );
};
