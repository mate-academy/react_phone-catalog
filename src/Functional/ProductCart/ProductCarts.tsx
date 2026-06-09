import { Link } from 'react-router-dom';
import styles from './ProductCarts.module.scss';
import { FavoritesIcon } from '../../utils/icons';
import { Products } from '../../types/Alltypes';
import React from 'react';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  product: Products;
};

export const ProductCarts: React.FC<Props> = ({ product }) => {
  if (!product) {
    return null;
  }

  const { id, image, title, price, screen, capacity, ram } = product;

  return (
    <article className={styles.productCart}>
      <Link to={`/product/${id}`}>
        <img className={styles.cardPhoto} src={image} alt={title} />
      </Link>

      <h2 className={styles.productCart}>
        <Link to={`/product/${id}`}>{title}</Link>
      </h2>
      <div className={styles.cardPrice}>${price}</div>

      <span className={styles.screen}>{screen}</span>
      <span className={styles.capacity}>{capacity}</span>
      <span className={styles.ram}>{ram}</span>

      <div className={styles.actions}>
        <button className={styles.cardToAdd}>Add to cart</button>
        <FavoritesIcon count={0} />
      </div>
    </article>
  );
};
