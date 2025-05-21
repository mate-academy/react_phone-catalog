import React from 'react';
import styles from './QuantityCounter.module.scss';

interface QuantityCounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabledDecrease?: boolean;
}

export const QuantityCounter: React.FC<QuantityCounterProps> = ({
  count,
  onIncrease,
  onDecrease,
  disabledDecrease,
}) => {
  return (
    <div className={styles['quantity-counter']}>
      <button
        className={styles['quantity-counter__button']}
        onClick={onDecrease}
        disabled={disabledDecrease}
      >
        <img src="./icons/Minus.png" alt="Minus" />
      </button>
      <span className={styles['quantity-counter__display']}>{count}</span>
      <button
        className={styles['quantity-counter__button']}
        onClick={onIncrease}
      >
        <img src="./icons/Plus.png" alt="Plus" />
      </button>
    </div>
  );
};
