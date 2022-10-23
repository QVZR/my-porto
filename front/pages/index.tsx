import type { NextPage } from "next";
import { About } from "../components/About";
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
