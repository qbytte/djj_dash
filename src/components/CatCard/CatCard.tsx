import styles from "./CatCard.module.css";

interface CatCardProps {
  title: string;
  needsAttention: number;
  totalCases: number;
}

const CatCard = ({ title, needsAttention, totalCases }:CatCardProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.detailsContainer}>
        <div>Needs atention: {needsAttention}</div>
        <div>Total cases: {totalCases}</div>
      </div>
    </div>
  );
};

export default CatCard;
