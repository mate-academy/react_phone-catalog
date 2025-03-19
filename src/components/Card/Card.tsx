import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';
import { Product } from '../../types/Product';

interface CardProps {
  card: Product;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${card.category}/${card.itemId}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
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
