import React from 'react';
import styles from './CartItem.module.scss';
import { CloseButton } from '../../../../shared/UI/Buttons/CloseButton';
import { Counter } from '../Counter';
import { ProductType } from '../../../../shared/types/ProductType';

interface Props {
  product: ProductType;
  quantity: number;
  onClose: () => void;
  onMinus: () => void;
  onPlus: () => void;
}

export const CartItem: React.FC<Props> = ({
  product,
  quantity,
  onClose,
  onMinus,
  onPlus,
}) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__information}>
        <CloseButton onClick={onClose} />

        <img
          src={product.image}
          alt="item photo"
          className={styles.logo__img}
        />

        <p className={styles.cart__title}>{product.name}</p>
      </div>

      <div className={styles.cartItem__quantity}>
        <Counter count={quantity} onMinus={onMinus} onPlus={onPlus} />

        <h3 className={styles.price}>{product.price}</h3>
      </div>
    </div>
  );
};
