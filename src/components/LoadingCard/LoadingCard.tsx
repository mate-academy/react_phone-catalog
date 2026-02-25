import React from "react";
import styles from "./LoadingCard.module.scss";

export const LoadingCard: React.FC = () => {
  return (
    <div className={styles.loaderBox}>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
    </div>
  );
};
