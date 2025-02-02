import React from 'react';
import styles from './AboutProduct.module.scss';
import { AllProduct } from '../../../../types/AllProduct';

type Props = {
  selectedProduct: AllProduct;
};

export const AboutProduct: React.FC<Props> = ({ selectedProduct }) => {
  return (
    <div className={styles.about}>
      <div className={styles.about__content}>
        <h2 className={styles.about__title}>About</h2>

        <div className={styles.about__divider}></div>

        {selectedProduct.description.map(({ title, text }) => (
          <div className={styles.about__textWrapper} key={title}>
            <p className={styles.about__secTitle}>{title}</p>

            {text.map((paragraph, index) => (
              <p className={styles.about__paragraph} key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.about__content}>
        <h2 className={styles.about__title}>Tech specs</h2>

        <div className={styles.about__divider}></div>
      </div>
    </div>
  );
};
