import { WriteForm } from "../../components/WtiteForm/index";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";

import { NextPage } from "next";

interface WritePageProps {}

const WritePage: NextPage = () => {
  return (
    <MainLayout>
      <WriteForm />
    </MainLayout>
  );
};

export default WritePage;
