import React from 'react';

import styles from './TechSpec.module.scss';
import { Capacity } from './Capacity/Capacity';
import { Colors } from './Colors/Colors';
import { Buttons } from '../../../shared/componets/ProductCard/Buttons';
import { ProductFullInfo } from '../../../shared/Utills/types';

type Props = {
  product: ProductFullInfo | null;
};

export const TechSpec: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.techspec}>
      <Colors colors={product?.colorsAvailable} />

      <Capacity capacityAviable={product?.capacityAvailable} />

      <div className={styles.price}>
        <h3>${product?.priceDiscount}</h3>

        <h3>${product?.priceRegular}</h3>
      </div>

      <Buttons />

      <div className={styles.haracteristiki}>
        <div>
          <span>Screen</span>
          <p>{product?.screen}</p>
        </div>

        <div>
          <span>Capacity</span>

          <p>{product?.capacity}</p>
        </div>

        <div>
          <span>RAM</span>
          <p>{product?.ram}</p>
        </div>
      </div>
    </section>
  );
};
