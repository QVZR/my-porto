import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "./About.module.scss";
import skils from "../../db/skils.json";

export const About: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Paper elevation={0} className={styles.hardSkils}>
          {skils.frontend.map((item, i) => (
            <a
              href={item.url}
              key={i}
              className={styles.skilItem}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </a>
          ))}
          {skils.backend.map((item, i) => (
            <a
              href={item.url}
              key={i}
              className={styles.skilItem}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </a>
          ))}
        </Paper>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Paper elevation={0} className={styles.transcription}>
            <Typography className={styles.title} variant="h4">
              Hello, my name is <b>Vitaly Khvorykh</b>.
            </Typography>
            <span>
              <p>And Im a junior front-end developer.</p>
              <p>
                IM 33 years old. I have extensive experience in leading retail sales teams. And all
                my life I was fond of programming. Lately, Ive decided to take it up professionally.
              </p>
              <p>
                I also enjoy running. I believe that it is impossible to work productively and think
                freshly without keeping the body in good shape. All my running achievements are
                recorded on{" "}
                <a
                  href="https://www.strava.com/athletes/vithvo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Strava
                </a>
              </p>
              <p>
                This website is blown away on the Next + Nest + PostgreSQL stack. You can register
                by entering your email and leave your blog post, or comment on your own or any other
                posts.
              </p>
            </span>
          </Paper>
        </div>
        <div className={styles.right}>
          <Paper elevation={0} className={styles.aboutMe}>
            {" "}
            <Typography className={styles.title} variant="h5">
              Front-end stack:
            </Typography>
            <ul>
              {skils.frontend.map((item, i) => (
                <a key={i} href={item.url} rel="noopener noreferrer" target="_blank">
                  <li>
                    <img src={item.img} alt={item.name} />
                    {item.name}
                  </li>
                </a>
              ))}
            </ul>
          </Paper>
          <Paper elevation={0} className={styles.aboutMe}>
            {" "}
            <Typography className={styles.title} variant="h5">
              Back-end stack and other:
            </Typography>
            <ul>
              {skils.backend.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
                  <li>
                    <img src={item.img} alt={item.name} />
                    {item.name}
                  </li>
                </a>
              ))}
            </ul>
          </Paper>
        </div>
      </div>
    </div>
  );
};
