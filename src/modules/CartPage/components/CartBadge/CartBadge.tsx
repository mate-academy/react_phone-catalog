import type React from 'react';
import { useCart } from '../../../../context/CartContext';
import styles from './CartBadge.module.scss';

export const CartBadge: React.FC = () => {
  const { totalCount } = useCart();

  if (totalCount === 0) {
    return null;
  }

  return <span className={styles.badge}>{totalCount}</span>;
};
