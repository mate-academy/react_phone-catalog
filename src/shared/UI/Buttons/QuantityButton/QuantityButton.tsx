import React from 'react';
import styles from './QuantityButton.module.scss';
import { MinusIcon } from '../../Icon/MinusIcon';
import { PlusIcon } from '../../Icon/PlusIcon';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  types: 'plus' | 'minus';
}

export const QuantityButton: React.FC<Props> = ({ types, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {types === 'minus' ? <MinusIcon /> : <PlusIcon />}
    </button>
  );
};
