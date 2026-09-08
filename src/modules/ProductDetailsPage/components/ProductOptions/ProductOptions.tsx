import React from 'react';

import styles from './ProductOptions.module.scss';

import { ProductFullInfo } from '../../../shared/Utills/types';
import { Capacity } from './Capacity/Capacity';
import { Colors } from './Colors/Colors';
import { Buttons } from '../../../shared/componets/ProductCard/Buttons';

type Props = {
  product: ProductFullInfo;
};

export const ProductOptions: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.product__options}>
      <div className={styles.gap}>
        <Colors product={product} />

        <div className={styles.polosa}></div>

        <Capacity product={product} />

        <div className={styles.polosa}></div>
      </div>

      <div className={styles.gap2}>
        <div className={styles.price}>
          <h3>${product?.priceDiscount}</h3>

          <h3>${product?.priceRegular}</h3>
        </div>

        <Buttons productId={product?.id} />

        <div className={styles.haracteristiki}>
          <div>
            <span>Screen</span>
            <p>{product?.screen}</p>
          </div>

          <div>
            <span>Resolution</span>
            <p>{product?.resolution}</p>
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
      </div>
    </section>
  );
};
