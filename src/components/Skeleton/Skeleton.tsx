import React from "react";
import styles from './Skeleton.module.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.price}></div>
      <div className={styles.info}></div>
      <div className={styles.buttons}></div>
    </div>
  )
}