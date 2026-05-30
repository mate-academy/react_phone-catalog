import React from 'react';
import styles from './NotFound.module.scss';
type Props = {
  title: string;
};
export const NotFound: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>{title}</h1>
      <div className={styles.notFound__img}>
        <img src="./img/product-not-found.png" alt="" />
      </div>
    </div>
  );
};
