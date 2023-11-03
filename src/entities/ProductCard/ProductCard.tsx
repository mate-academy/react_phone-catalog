import React, { ReactNode } from 'react';
import { IProduct } from './product.interface';
import styles from './ProductCard.module.scss';

type Props = {
  product: IProduct,
  actions: ReactNode,
};

export const ProductCard: React.FC<Props> = ({
  product: {
    name,
    price,
    fullPrice,
    image,
  },
  actions,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={`_new/${image}`} alt="alt" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.price}>
          <span className={styles.discount}>{`$${price}`}</span>
          <span className={styles.fullPrice}>{`$${fullPrice}`}</span>
        </div>
      </div>
      {actions}
    </div>
  );
};
