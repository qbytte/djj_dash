import styles from "./NavBar.module.css";
import { TiHome } from "react-icons/ti";
import { FaGlobeAmericas } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainBtnContainer}>
        <button className={styles.homeBtn}>
          <TiHome size={44} />
        </button>
        <button>
          <FaGlobeAmericas size={34} />
        </button>
      </div>
      <div className={styles.catBtnContainer}>
        <button>AMR</button>
        <button>TPR</button>
        <button>TMR</button>
        <button>RMR</button>
        <button>UPAP</button>
        <button>WMR</button>
        <button>Fe</button>
        <button>DJJ</button>
      </div>
    </div>
  );
};

export default NavBar;
