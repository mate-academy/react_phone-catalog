import { Link } from 'react-router-dom';
import styles from './CartsHot.module.scss';
import { Products } from '../../types/Alltypes';
import React from 'react';

type Props = {
  product: Products;
};

export const CartsHot: React.FC<Props> = ({ product }) => {
  if (!product) {
    return null;
  }

  const {
    category,
    itemId,
    fullPrice,
    image,
    name,
    price,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <article className={styles.container}>
      <Link to={`/${category}/${itemId}`} className={styles.productCart}>
        <img className={styles.cardPhoto} src={image} alt={name} />
        <h2 className={styles.productCart}>{name}</h2>
        <div className={styles.cardPriceGoup}>
          <span className={styles.cardPriceHot}>${price}</span>
          <span className={styles.cardfullPriceHot}>${fullPrice}</span>
        </div>
        <div className={styles.cardSpes}>
          <div className={styles.screen}>
            <span>Screen</span>
            <strong className={styles.strong}>{screen}</strong>
          </div>
          <div className={styles.capacity}>
            <span>Capacity</span>
            <strong className={styles.strong}>{capacity}</strong>
          </div>
          <div className={styles.ram}>
            <span>Ram</span>
            <strong className={styles.strong}>{ram}</strong>
          </div>
        </div>
      </Link>
      <div className={styles.actions}>
        <button className={styles.cardToAdd}>Add to cart</button>
        <button className={styles.buttonToFavorites}>
          <img
            src="/img/favorites.svg"
            className={styles.iconImgFavorites}
            alt="Favourites"
          />
        </button>
      </div>
    </article>
  );
};
