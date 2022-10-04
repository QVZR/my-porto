import { Header } from "../components/Header/Header";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div>{children}</div>
    </div>
  );
};
