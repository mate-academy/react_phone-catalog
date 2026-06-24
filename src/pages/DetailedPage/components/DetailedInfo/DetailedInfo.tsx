/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './DetailedInfo.module.scss';
import { Good } from '../../../../../public/api/types/Good';
import { Theme } from '../../../../../public/api/types/theme';

type DetailPageProps = {
  product: Good;
  theme: string;
};

export const DetailedInfo: React.FC<DetailPageProps> = ({ product, theme }) => {
  return (
    <>
      <div
        className={[
          styles.detailed,
          theme === Theme.LIGHT ? styles['detailed--light'] : '',
        ].join(' ')}
      >
        <div className={styles.description}>
          <p className={styles.description__header}>About</p>
          {product.description.map((section: any, i: number) => (
            <div key={i}>
              <h3 className={styles.description__title}>{section.title}</h3>
              {section.text.map((text: string, j: number) => (
                <p key={j} className={styles.description__text}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.specs}>
          <p className={styles.description__header}>Tech specs</p>
          <dl className={styles.product__specs}>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>Screen</dt>
              <dd className={styles.product__specs__dd}>{product.screen}</dd>
            </div>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>Capacity</dt>
              <dd className={styles.product__specs__dd}>{product.capacity}</dd>
            </div>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>Processor</dt>
              <dd className={styles.product__specs__dd}>{product.processor}</dd>
            </div>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>RAM</dt>
              <dd className={styles.product__specs__dd}>{product.ram}</dd>
            </div>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>Camera</dt>
              <dd className={styles.product__specs__dd}>{product.camera}</dd>
            </div>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>Zoom</dt>
              <dd className={styles.product__specs__dd}>{product.zoom}</dd>
            </div>
            <div className={styles.product__specItem}>
              <dt className={styles.product__specs__dt}>Cell</dt>
              {product.cell.map((c, i) => (
                <dd className={styles.product__specs__dd} key={i}>
                  {c},
                </dd>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
