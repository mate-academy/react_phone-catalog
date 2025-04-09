import React from 'react';
import styles from './Categorys.module.scss';

const Categorys = () => {
  return (
    <section className={styles.categorys}>
      <h2 className={styles.categorys__title}>Shop by category</h2>
      <div className={styles.categorys__content}></div>
    </section>
  );
};

export default Categorys;
