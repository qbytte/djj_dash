import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import { trpc } from "../../utils/trpc";

interface LayoutProps {
  children: React.ReactNode;
  title: string | undefined;
  enableSearch: boolean;
  handleSearch?: (searchValue: string) => void;
}

const Layout = ({ children, title, enableSearch, handleSearch }: LayoutProps) => {
  const { data, isLoading } = trpc.categories.getAll.useQuery();

  return (
    <div className={styles.gridContainer}>
      <div className={styles.nav}>
        <NavBar customers={data} isLoading={isLoading} />
      </div>
      <div className={styles.header}>
        <Header
          title={title}
          isLoading={isLoading}
          enableSearch={enableSearch}
          handleSearch={handleSearch}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
