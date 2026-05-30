import React from 'react';
import styles from './TechSection.module.scss';
import { Phone } from '../../../shared/types';

const TechSection: React.FC<{ product: Phone }> = ({ product }) => {
  return (
    <div className={styles.tech}>
      <h2 className={styles.tech__title}>Tech specs</h2>
      <div className={styles.tech__details}>
        <span>Screen</span>
        <span>{product.screen}</span>
      </div>
      <div className={styles.tech__details}>
        <span>Resolution</span>
        <span>{product.resolution}</span>
      </div>
      <div className={styles.tech__details}>
        <span>Processor</span>
        <span>{product.processor}</span>
      </div>
      <div className={styles.tech__details}>
        <span>RAM</span>
        <span>{product.ram}</span>
      </div>
      <div className={styles.tech__details}>
        <span>Built in memory</span>
        <span>{product.capacity}</span>
      </div>
      {product.camera && (
        <div className={styles.tech__details}>
          <span>Camera</span>
          <span>{product.camera}</span>
        </div>
      )}
      {product.zoom && (
        <div className={styles.tech__details}>
          <span>Zoom</span>
          <span>{product.zoom}</span>
        </div>
      )}
      <div className={styles.tech__details}>
        <span>Cell</span>
        <span>{product.cell.join(', ')}</span>
      </div>
    </div>
  );
};

export default TechSection;
