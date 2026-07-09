import React from 'react';
import styles from './ProductCardLoading.module.scss';

export const ProductCardLoading = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div className={styles.isloading} key={i}>
          <div className={styles.image}></div>
          <div className={styles.content}>
            <div className={styles.text_container}>
              <div className={styles.main_text}></div>
              <div className={styles.main_text}></div>
              <div className={styles.sub_text}></div>
              <div className={styles.sub_text}></div>
              <div className={styles.sub_text}></div>
              <div className={styles.btns}>
                <div className={styles.btn}></div>
                <div className={styles.btn}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
