/* eslint-disable max-len */
import React, { useContext } from 'react';

import { ProductsContext } from '../../../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../../../context/ProductsContext/types/CurrentProduct';
import { Spec } from './enums/Spec';
import styles from './ThirdPart.module.scss';

export const ThirdPart: React.FC = () => {
  const { currentProduct } = useContext(ProductsContext);
  const { screen, resolution, processor, ram } =
    currentProduct as CurrentProduct;

  const spec = [screen, resolution, processor, ram];

  return (
    <div className={styles['third-part']}>
      {Object.values(Spec).map((value, index) => {
        return (
          <div className={styles.spec} key={value}>
            <div className={styles['spec-title']}>{value}</div>

            <div className={styles['spec-value']}>{spec[index]}</div>
          </div>
        );
      })}
    </div>
  );
};
