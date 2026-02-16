import React from 'react';
import styles from './TechSpecs.module.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.techSpecs}>
      <h2 className={styles.techSpecs__title}>Tech specs</h2>
      <ul className={styles.techSpecs__list}>
        <li className={styles.techSpecs__item}>
          <span className={styles.techSpecs__name}>Screen</span>

          <span className={styles.techSpecs__info}>{product.screen}</span>
        </li>

        <li className={styles.techSpecs__item}>
          <span className={styles.techSpecs__name}>Resolution</span>

          <span className={styles.techSpecs__info}>{product.resolution}</span>
        </li>

        <li className={styles.techSpecs__item}>
          <span className={styles.techSpecs__name}>Processor</span>

          <span className={styles.techSpecs__info}>{product.processor}</span>
        </li>

        <li className={styles.techSpecs__item}>
          <span className={styles.techSpecs__name}>RAM</span>

          <span className={styles.techSpecs__info}>{product.ram}</span>
        </li>

        <li className={styles.techSpecs__item}>
          <span className={styles.techSpecs__name}>Built in memory</span>

          <span className={styles.techSpecs__info}>{product.capacity}</span>
        </li>

        {product.camera && (
          <li className={styles.techSpecs__item}>
            <span className={styles.techSpecs__name}>Camera</span>

            <span className={styles.techSpecs__info}>{product.camera}</span>
          </li>
        )}

        {product.zoom && (
          <li className={styles.techSpecs__item}>
            <span className={styles.techSpecs__name}>Zoom</span>

            <span className={styles.techSpecs__info}>{product.zoom}</span>
          </li>
        )}

        <li className={styles.techSpecs__item}>
          <span className={styles.techSpecs__name}>Cell</span>

          <span className={styles.techSpecs__info}>
            {product.cell.join(', ')}
          </span>
        </li>
      </ul>
    </div>
  );
};
