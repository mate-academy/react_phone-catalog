import React from 'react';
import styles from './ProductTechSpecs.module.scss';
import { Phone } from '../../../../types/Phone';

type Props = {
  product: Phone;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.techspecs}>
      <div className={styles.techspecs__title}>
        <h3>Tech specs</h3>
        <div className={styles.techspecs__line}></div>
      </div>
      <div className={styles.techspecs__list}>
        <div className={styles.techspecs__item}>
          <span className={`${styles.techspecs__name} body-text`}>Screen</span>
          <span className={`${styles.techspecs__value} body-text`}>
            {product.screen}
          </span>
        </div>
        <div className={styles.techspecs__item}>
          <span className={`${styles.techspecs__name} body-text`}>Resolution</span>
          <span className={`${styles.techspecs__value} body-text`}>
            {product.resolution}
          </span>
        </div>
        <div className={styles.techspecs__item}>
          <span className={`${styles.techspecs__name} body-text`}>Processor</span>
          <span className={`${styles.techspecs__value} body-text`}>
            {product.processor}
          </span>
        </div>
        <div className={styles.techspecs__item}>
          <span className={`${styles.techspecs__name} body-text`}>RAM</span>
          <span className={`${styles.techspecs__value} body-text`}>
            {product.ram}
          </span>
        </div>
        <div className={styles.techspecs__item}>
          <span className={`${styles.techspecs__name} body-text`}>
            Built in memory
          </span>
          <span className={`${styles.techspecs__value} body-text`}>
            {product.capacity}
          </span>
        </div>
        {product.camera && (
          <div className={styles.techspecs__item}>
            <span className={`${styles.techspecs__name} body-text`}>
              Camera
            </span>
            <span className={`${styles.techspecs__value} body-text`}>
              {product.camera}
            </span>
          </div>
        )}
        {product.zoom && (
          <div className={styles.techspecs__item}>
            <span className={`${styles.techspecs__name} body-text`}>Zoom</span>
            <span className={`${styles.techspecs__value} body-text`}>
              {product.zoom}
            </span>
          </div>
        )}
        <div className={styles.techspecs__item}>
          <span className={`${styles.techspecs__name} body-text`}>Cell</span>
          <span className={`${styles.techspecs__value} body-text`}>
            {product.cell.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};
