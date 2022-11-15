import Link from "next/link";
import styles from "./CatCard.module.css";

interface CatCardProps {
  title: string;
  needsAttention: number;
  totalCases: number;
  customerId: string;
}

const CatCard = ({ title, needsAttention, totalCases, customerId }: CatCardProps) => {
  return (
    <Link href={`/customer?customer=${customerId}`}>
      <div className={styles.container}>
        <p className={styles.title}>{title}</p>
        <div className={styles.detailsContainer}>
          <div>Needs atention: {needsAttention}</div>
          <div>Total cases: {totalCases}</div>
        </div>
      </div>
    </Link>
  );
};

export default CatCard;
