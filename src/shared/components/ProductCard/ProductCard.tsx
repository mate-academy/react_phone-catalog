import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { UiProduct } from '../ProductsSlider/ProductSlider';

type Props = {
  product: UiProduct;
  showOldPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showOldPrice = true,
}) => {
  const { title, img, price, oldPrice, screen, capacity, ram } = product;
  const [favorite, setFavorite] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={title} className={styles.image} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${price}</span>
        {showOldPrice && oldPrice && (
          <span className={styles.oldPrice}>${oldPrice}</span>
        )}
      </div>

      <ul className={styles.details}>
        <li>
          <span>Screen</span>
          <span>{screen}</span>
        </li>
        <li>
          <span>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li>
          <span>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.addToCart}>Add to cart</button>
        <button
          data-selected={favorite}
          className={styles.favorite}
          onClick={() => {
            setFavorite(!favorite);
          }}
        >
          <img
            src={
              favorite
                ? '/icons/heart_selected.svg'
                : '/icons/heart_default.svg'
            }
            alt={favorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        </button>
      </div>
    </article>
  );
};
