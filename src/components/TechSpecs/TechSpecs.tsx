import React from 'react';
import styles from './TechSpecs.module.scss';
import { Product } from '../../utils/types';
import { Title } from '../Title';

type Props = {
  product: Product;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.techSpecs}>
      <div className={styles.techSpecs__title}>
        <Title level={3}>Tech specs</Title>
      </div>
      <div className={styles.techSpecs__characteristics}>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>Screen</p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.screen}
          </p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>Resolution</p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.resolution}
          </p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>Processor</p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.processor}
          </p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>RAM</p>
          <p className={styles.techSpecs__characteristicValue}>{product.ram}</p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>
            Built in memory
          </p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.capacity}
          </p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>Camera</p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.camera}
          </p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>Zoom</p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.zoom}
          </p>
        </div>
        <div className={styles.techSpecs__characteristic}>
          <p className={styles.techSpecs__characteristicName}>Cell</p>
          <p className={styles.techSpecs__characteristicValue}>
            {product.cell}
          </p>
        </div>
      </div>
    </div>
  );
};
