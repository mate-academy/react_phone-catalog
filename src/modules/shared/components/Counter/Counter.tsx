import React from 'react';
import styles from './Counter.module.scss';
import { QuantityButton } from '../../../../shared/UI/Buttons/QuantityButton';

interface Props {
  count: number;
  onPlus: () => void;
  onMinus: () => void;
}

export const Counter: React.FC<Props> = ({ count, onMinus, onPlus }) => {
  return (
    <div className={styles.counter}>
      <QuantityButton
        types="minus"
        onClick={() => onMinus()}
        disabled={count <= 1}
      />
      {count}
      <QuantityButton types="plus" onClick={() => onPlus()} />
    </div>
  );
};
