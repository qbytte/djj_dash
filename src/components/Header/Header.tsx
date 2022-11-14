import { AiOutlineSearch } from 'react-icons/ai';
import styles from './Header.module.css';

interface Props {
    title: string | undefined;
}

const Header = ({ title }:Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <div className={styles.search}>
        <input type="text" />
        <AiOutlineSearch color='#22181C' size={18}/>
      </div>
    </div>
  );
};

export default Header;
