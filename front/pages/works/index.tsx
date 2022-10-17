import { Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Works.module.scss";
import sites from "../../db/sites.json";

// type descProps = {
//   title: string;
//   text: string;
// };

// interface siteProps {
//   name: string;
//   img: string;
//   desc: descProps;
//   url: string;
// }

const Works: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className={styles.wrapper}>
          <div className={styles.works}>
            {sites.map((item, i) => {
              return (
                <Paper key={i} elevation={0} className={styles.workItem}>
                  <div className={styles.workImg}>
                    <img src={item.img} alt={item.name} />
                  </div>

                  <div className={styles.workDescription}>
                    <Typography variant="h5">{item.desc.title}</Typography>
                    <div className={styles.descMiddle}>
                      <ul>
                        <h3>Used in development:</h3>
                        {item.desc.used.map((use, i) => (
                          <li key={i}>{use}</li>
                        ))}
                      </ul>
                      <ul>
                        <h3>You can:</h3>
                        {item.desc.ucan.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.descBottom}>
                      <b>Click here &rarr;</b>{" "}
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </div>
                  </div>
                </Paper>
              );
            })}
            <Paper className={styles.worksBottom}>
              <Typography variant="h5">
                You can also visit my{" "}
                <a href="https://github.com/vithvo" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>{" "}
                page and see other works.
              </Typography>
            </Paper>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Works;
