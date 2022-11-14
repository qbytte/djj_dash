import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Header.module.css";

interface Props {
  title: string | undefined;
  isLoading: boolean;
}

const Header = ({ title, isLoading }: Props) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <span className={styles.title}>Loading...</span>
      ) : (
        <span className={styles.title}>{title}</span>
      )}
      <div className={styles.search}>
        <input type="text" />
        <AiOutlineSearch color="#22181C" size={18} />
      </div>
    </div>
  );
};

export default Header;
