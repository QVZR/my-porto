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
import { useSelector } from "react-redux";
import { selectCommentsData } from "../../redux/slices/comments";

type PosrActionsProps = {
  id: Number;
  views: number;
  commentCount: number;
};

export const PostActions: React.FC<PosrActionsProps> = ({ id, views, commentCount }) => {
  const count = useSelector(selectCommentsData);

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
          <p>{commentCount}</p>
        </li>

        <li>
          <VisibilityOutlined />

          <p>{views}</p>
        </li>
      </ul>
    </div>
  );
};
