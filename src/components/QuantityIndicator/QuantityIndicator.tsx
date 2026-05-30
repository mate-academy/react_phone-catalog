import React from 'react';
import styles from './QuantityIndicator.module.scss';

type Props = {
  number: number | null;
};

export const QuantityIndicator: React.FC<Props> = ({ number }) => {
  return <div className={styles.quantityIndicator}>{number}</div>;
};
