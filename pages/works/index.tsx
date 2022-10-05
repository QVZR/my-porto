import { NextPage } from "next";
import React from "react";
import { Header } from "../../components/Header";
import { MainLayout } from "../../layouts/MainLayout";
import styles from "./Works.module.scss";

const Works: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className={styles.wrapper}></div>
      </MainLayout>
    </>
  );
};

export default Works;
