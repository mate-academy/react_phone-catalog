import React from 'react';
import { ProductDetails } from '../../../../types';
import styles from './TechSpecs.module.scss';

type Props = {
  product: ProductDetails;
};

export const TechSpecs = ({ product }: Props) => {
  return (
    <div className={styles.techSpecs}>
      <h2 className={styles.title}>Tech specs</h2>

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Resolution</dt>
          <dd>{product.resolution}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Processor</dt>
          <dd>{product.processor}</dd>
        </div>
        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Built in memory</dt>
          <dd>{product.capacity}</dd>
        </div>
        {product.camera && (
          <div className={styles.spec}>
            <dt>Camera</dt>
            <dd>{product.camera}</dd>
          </div>
        )}
        {product.zoom && (
          <div className={styles.spec}>
            <dt>Zoom</dt>
            <dd>{product.zoom}</dd>
          </div>
        )}
        <div className={styles.spec}>
          <dt>Cell</dt>
          <dd>{product.cell.join(', ')}</dd>
        </div>
      </dl>
    </div>
  );
};
