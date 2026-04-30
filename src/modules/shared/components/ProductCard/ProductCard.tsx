import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../../../types';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <article className={styles.productCard}>
      <Link to={`/product/${product.itemId}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <p>${product.price}</p>
        <p>${product.fullPrice}</p>
      </div>

      <div className={styles.another_info}>
        <div className={styles.info}>
          <p>Screen</p>
          <p>{product.screen}</p>
        </div>
        <div className={styles.info}>
          <p>capacity</p>
          <p>{product.capacity}</p>
        </div>
        <div className={styles.info}>
          <p>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.addToCart}> Add to cart</button>
        <button className={styles.addToFav}>
          <img src="/img/icons/Favorites.svg" alt="add to favorites" />
        </button>
      </div>
    </article>
  );
};
