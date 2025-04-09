import React from 'react';
import styles from './CardItem.module.scss';
import favouriteIcon from '../../assets/img/tools/favourite_ico.svg';
import { Product } from '../../types/products';

type Props = {
  product: Product;
};

const CardItem: React.FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram, image } = product;

  return (
    <article className={styles.card}>
      <img src={image} alt="iphone" className={styles.card__img} />
      <p className={styles.card__title}>{name}</p>
      <p className={styles.card__price}>
        {`$${price} `}
        {fullPrice !== price && (
          <span className={styles.card__price_action}> ${fullPrice}</span>
        )}
      </p>
      <hr className={styles.card__hr} />
      <ul className={styles.propertys}>
        <li className={styles.propertys__item}>
          <p className={styles.propertys__title}>Screen</p>
          <p className={styles.propertys__value}>{screen}</p>
        </li>

        <li className={styles.propertys__item}>
          <p className={styles.propertys__title}>Capacity</p>
          <p className={styles.propertys__value}>{capacity}</p>
        </li>

        <li className={styles.propertys__item}>
          <p className={styles.propertys__title}>RAM</p>
          <p className={styles.propertys__value}>{ram}</p>
        </li>
      </ul>

      <div className={styles.card__buttons}>
        <button className={styles.card__addBtn}>Add to cart</button>
        <button className={styles.card__favouriteBtn}>
          <img src={favouriteIcon} alt="favourite" />
        </button>
      </div>
    </article>
  );
};

export default CardItem;
