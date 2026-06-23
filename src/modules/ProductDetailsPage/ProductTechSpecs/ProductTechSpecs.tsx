import React from 'react';

import { ProductDetail } from '../../../types/Product';

import styles from './ProductTechSpecs.module.scss';

type Props = {
  device: ProductDetail;
};

export const ProductTechSpecs: React.FC<Props> = ({ device }) => {
  return (
    <div className={styles.techSpecsBlock}>
      <div className={styles.titleBlock}>
        <h3>Tech specs</h3>
      </div>

      <div className={styles.specsList}>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Screen</span>
          <span className={styles.techSpecValue}>{device.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Resolution</span>
          <span className={styles.techSpecValue}>{device.resolution}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Processor</span>
          <span className={styles.techSpecValue}>{device.processor}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>RAM</span>
          <span className={styles.techSpecValue}>{device.ram}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Built in memory</span>
          <span className={styles.techSpecValue}>{device.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Camera</span>
          <span className={styles.techSpecValue}>{device.camera}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Zoom</span>
          <span className={styles.techSpecValue}>{device.zoom}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.techSpecName}>Cell</span>
          <span className={styles.techSpecValue}>{device.cell.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};
