import { Paper } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "./About.module.scss";
import skils from "./skils/skils.json";

export const About: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Paper elevation={0} className={styles.hardSkils}>
          {skils.map((item, i) => (
            <a href={item.url} key={i} className={styles.skilItem} target="_blank">
              <img src={item.img} alt="skilImg" />
              <p>{item.name}</p>
            </a>
          ))}
        </Paper>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Paper elevation={0} className={styles.transcription} />
        </div>
        <div className={styles.right}>
          <Paper elevation={0} className={styles.aboutMe} />
          <Paper elevation={0} className={styles.aboutMe} />
        </div>
      </div>
    </div>
  );
};
