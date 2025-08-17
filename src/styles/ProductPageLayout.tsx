import React from 'react';
import styles from './ProductPageLayout.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ProductPageLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}> {children} </div>
      </div>
    </section>
  );
};
