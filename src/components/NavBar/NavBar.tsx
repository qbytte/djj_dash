import styles from "./NavBar.module.css";
import { TiHome } from "react-icons/ti";
import { FaGlobeAmericas } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { Customer, Cases } from "@prisma/client";

interface NavBarProps {
  customers:
    | (Customer & {
        cases: Cases[];
      })[]
    | undefined;
  isLoading: boolean;
}

const NavBar = ({ customers, isLoading }: NavBarProps) => {
  const router = useRouter();
  const { customer } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles.mainBtnContainer}>
        <button className={router.pathname === "/" ? styles.active : styles.homeBtn}>
          <Link href={"/"}>
            <TiHome
              size={44}
            />
          </Link>
        </button>
        <button className={router.pathname === "/global" ? styles.active : styles.homeBtn}>
          <Link href={"/global"}>
            <FaGlobeAmericas
              size={34}
            />
          </Link>
        </button>
      </div>
      <div className={styles.catBtnContainer}>
        {isLoading ? (
          <p className={styles.loading}>...</p>
        ) : (
          customers?.map((c) => (
            <button key={c.id} className={styles.homeBtn}>
              <Link href={`/customer?customer=${c.id}`}>
                <p className={c.id === customer ? styles.active : ""}>
                  {c.alt}
                </p>
              </Link>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default NavBar;
