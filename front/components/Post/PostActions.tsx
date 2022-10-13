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

type PosrActionsProps = {
  id: Number;
  views: number;
};

export const PostActions: React.FC<PosrActionsProps> = ({ id, views }) => {
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

          <p>{views}</p>
        </li>
      </ul>
    </div>
  );
};
