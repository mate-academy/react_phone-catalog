import React from 'react';
import styles from './Card.module.scss';

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface CardProps {
  card: Product;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.card}>
      <img src={card.image} alt={card.name} className={styles.card__img} />
      <p className={styles.card__name}>{card.name}</p>
      <div className={styles.card__prices}>
        <h3 className={styles.card__price}>${card.price}</h3>
        <p className={styles.card__fullprice}>${card.fullPrice}</p>
      </div>
      <div className={styles.card__line}></div>
      <div className={styles.card__specifications}>
        <div className={styles.card__specification}>
          <p className={styles.card__specificationName}>Screen</p>
          <p className={styles.card__specificationValue}>{card.screen}</p>
        </div>
        <div className={styles.card__specification}>
          <p className={styles.card__specificationName}>Capacity</p>
          <p className={styles.card__specificationValue}>{card.capacity}</p>
        </div>
        <div className={styles.card__specification}>
          <p className={styles.card__specificationName}>RAM</p>
          <p className={styles.card__specificationValue}>{card.ram}</p>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <button type="button" className={styles.card__buttonsAdd}>
          Add to Cart
        </button>
        <button type="button" className={styles.card__buttonsFavorite}></button>
      </div>
    </div>
  );
};
