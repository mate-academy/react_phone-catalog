import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { ProductControllers } from '../../components';
import { Product } from '../../typies';

type Props = {
  product: Product;
  discount?: boolean;
  productDetail?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  discount = true,
  productDetail,
}) => {
  const { name, image, price, fullPrice, screen, capacity, ram } = product;

  return (
    <article className={styles.container}>
      <div className={styles.inner}>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img
            src={productDetail ? `./${image}` : image}
            alt={name}
            className={styles.image}
          />
        </Link>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.name}
        >
          {name}
        </Link>

        <div className={styles.prices}>
          <p className={styles.actual}>${price}</p>
          {discount && <p className={styles.previous}>${fullPrice}</p>}
        </div>

        <hr className={styles.line} />

        <div className={styles.details}>
          {screen && (
            <div className={styles.screen}>
              <p>Screen:</p>
              <p>{screen}</p>
            </div>
          )}

          {capacity && (
            <div className={styles.capacity}>
              <p>Capacity:</p>
              <p>{capacity}</p>
            </div>
          )}

          {ram && (
            <div className={styles.ram}>
              <p>RAM:</p>
              <p>{ram}</p>
            </div>
          )}
        </div>

        <ProductControllers product={product} />
      </div>
    </article>
  );
};
