import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import { trpc } from "../../utils/trpc";

interface LayoutProps {
  children: React.ReactNode;
  title: string | undefined;
}

const Layout = ({ children, title }:LayoutProps) => {
  const { data, isLoading } = trpc.categories.getAll.useQuery();

  return (
    <div className={styles.gridContainer}>
      <div className={styles.nav}>
        <NavBar customers={data} />
      </div>
      <div className={styles.header}>
        <Header title={title} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
