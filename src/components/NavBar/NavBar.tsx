import styles from "./NavBar.module.css";
import { TiHome } from "react-icons/ti";
import { FaGlobeAmericas } from "react-icons/fa";
import Link from "next/link";
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
  return (
    <div className={styles.container}>
      <div className={styles.mainBtnContainer}>
        <button className={styles.homeBtn}>
          <Link href={"/"}>
            <TiHome size={44} />
          </Link>
        </button>
        <button>
          <FaGlobeAmericas size={34} />
        </button>
      </div>
      <div className={styles.catBtnContainer}>
        {isLoading ? (
          <p className={styles.loading}>...</p>
        ) : (
          customers?.map((customer) => (
            <button key={customer.id} className={styles.homeBtn}>
              <Link href={`/customer?customer=${customer.id}`}>
                <p>{customer.alt}</p>
              </Link>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default NavBar;
