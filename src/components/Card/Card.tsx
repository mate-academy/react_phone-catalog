import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import styles from './Card.module.scss';

interface CardProps {
  card: Product;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${card.category}/${card.itemId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        handleClick();
        scrollToTop();
      }}
    >
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
        <ToggleButton product={card} type="cart" />
        <ToggleButton product={card} type="favorites" />
      </div>
    </div>
  );
};
