import { WriteForm } from "../../components/WtiteForm/index";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";

import { NextPage } from "next";
import Link from "next/link";
import { Button } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";

import styles from "../posts/Slug.module.scss";

interface WritePageProps {}

const WritePage: NextPage = () => {
  return (
    <MainLayout>
      <Link href="/blog">
        <a>
          <Button className={styles.headerPenButton} variant="contained">
            <ArrowBackOutlined /> Back
          </Button>
        </a>
      </Link>
      <WriteForm />
    </MainLayout>
  );
};

export default WritePage;
