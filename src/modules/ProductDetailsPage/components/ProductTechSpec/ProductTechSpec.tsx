import React from 'react';
import styles from './ProductTechSpec.module.scss';
import { DetailsProduct } from '../../../../types/productTypes';

type SpecProps = {
  item: DetailsProduct;
};

type TechSpec = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string;
};

const techLabels: TechSpec = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  ram: 'RAM',
  camera: 'Camera',
  zoom: 'Zoom',
  cell: 'Cell',
};

type SpecKey = keyof TechSpec;

export const ProductTechSpec = ({ item }: SpecProps) => {
  const techSpec = Object.keys(item).filter(
    (key): key is SpecKey => key in techLabels,
  );

  return (
    <section className={styles.section}>
      <h3 className={styles.section__title}>Tech specs</h3>
      <div className={styles.verticalLine}></div>
      <div className={styles.wrapperDetails}>
        {techSpec.map(spec => {
          const value = item[spec as keyof TechSpec];

          if (!value) {
            return null;
          }

          return (
            <div key={spec} className={styles.details}>
              <p className={styles.details__label}>{techLabels[spec]}</p>
              <p className={styles.details__value}>{value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
