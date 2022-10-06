import { Paper } from "@mui/material";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Works.module.scss";

const Works: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className={styles.wrapper}>
          <div className={styles.works}>
            <Paper elevation={0} className={styles.workItem}>
              <div className={styles.workImg}>
                <img src="img/worksImg/sneakers.png" alt="sneakers" />
              </div>
              <div className={styles.workDescription}></div>
            </Paper>
            <Paper elevation={0} className={styles.workItem}>
              <div className={styles.workImg}>
                <img src="img/worksImg/sneakers.png" alt="sneakers" />
              </div>
              <div className={styles.workDescription}></div>
            </Paper>
            
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Works;
