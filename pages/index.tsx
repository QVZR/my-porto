import type { NextPage } from "next";
import { MainLayout } from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <div className="wrapper">
      <MainLayout>
        <div></div>
      </MainLayout>
    </div>
  );
};

export default Home;
