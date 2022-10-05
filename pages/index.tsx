import type { NextPage } from "next";
import { About } from "../components/About";
import { Header } from "../components/Header";
import { MainLayout } from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <div className="wrapper">

      <MainLayout>
        <About />
      </MainLayout>
    </div>
  );
};

export default Home;
