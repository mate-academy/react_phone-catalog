import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { AddButtons } from '../AddButtons';
import { InfoBlock } from '../InfoBlock';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = true,
}) => {
  return (
    <div className={styles.container}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productLink}
      >
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={`/${product.image}`}
            alt={product.name}
          />
        </div>

        <p className={styles.title}>{product.name}</p>
      </Link>

      <div className={styles.priceBlock}>
        <span className={styles.price}>{`$${product.price}`}</span>

        {showDiscount && (
          <span className={styles.fullPrice}>{`$${product.fullPrice}`}</span>
        )}
      </div>

      <div className={styles.decoration} />

      <InfoBlock product={product} />

      <AddButtons product={product} />
    </div>
  );
};
