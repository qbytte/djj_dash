import styles from "./CatCard.module.css";

const CatCard = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Title</p>
      <div className={styles.detailsContainer}>
        <div>Needs atention: x</div>
        <div>Total cases: x</div>
      </div>
    </div>
  );
};

export default CatCard;
