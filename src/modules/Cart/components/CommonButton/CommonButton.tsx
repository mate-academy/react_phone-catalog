import React from 'react';
import { useCart } from '../../../../ProductsContext/CartContext';
import styles from './CommonButton.module.scss';
import { Product } from '../../../../ProductsContext/TabsContext';

interface CommonButtonProps {
  setCountItems: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  element: Product;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  setCountItems,
  element,
}) => {
  const { toggleCart } = useCart();

  return (
    <button
      className={styles.commonButton}
      onClick={() => {
        toggleCart(element.id);
        setCountItems(prev => {
          const updated = { ...prev };

          delete updated[element.id];

          return updated;
        });
      }}
    >
      <img src="/img/SliderImg/Union.svg" alt="Union" />
    </button>
  );
};
