/* eslint-disable max-len */
import React from 'react';
import styles from './CardsCarusel.module.scss';
import { Card } from '../Card/Card';
import { Products } from '../../../type/Products';

interface Props {
  props: Products[];
  discount?: boolean;
  carusel?: boolean;
  amount?: number;
}

export const CardsCarusel: React.FC<Props> = ({
  props,
  discount = false,
  carusel = true,
  amount = 4,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [...props];

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      return (prevIndex + 1) % cards.length;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      return (prevIndex - 1 + cards.length) % cards.length;
    });
  };

  return (
    <div className={styles.container}>
      {carusel && (
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <span>
              <img src="img/icons/Arrow_Left.svg" alt="arrow_left" />
            </span>
          </button>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={
              currentIndex + amount === cards.length || props.length < 4
            }
          >
            <span>
              <img src="img/icons/Arrow_Right.svg" alt="arrow_right" />
            </span>
          </button>
        </div>
      )}
      <div className={styles.cards}>
        {cards
          .slice(currentIndex, currentIndex + amount)
          .map((product, index) => (
            <Card key={index} product={product} discount={discount} />
          ))}
      </div>
    </div>
  );
};
