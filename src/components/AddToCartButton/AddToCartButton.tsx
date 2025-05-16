import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useCart } from '../../hooks';

import styles from './AddToCartButton.module.scss';

type Props = {
  productId: string;
  isClickable?: boolean;
  className?: string;
};

export const AddToCartButton: React.FC<Props> = ({
  productId,
  isClickable = true,
  className = '',
}) => {
  const { cart, addCartItem, removeCartItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(cart.some(item => item.itemId === productId));
  }, [cart, productId]);

  const toggleCartItem = () => {
    if (!isClickable) {
      return;
    }

    if (isAdded) {
      removeCartItem(productId);
    } else {
      addCartItem({ itemId: productId, quantity: 1 });
    }
  };

  return (
    <button
      className={classNames(styles['add-to-cart-btn'], className, {
        [styles['add-to-cart-btn--active']]: isAdded,
      })}
      onClick={toggleCartItem}
    >
      {isAdded ? 'Added' : 'Add to cart'}
    </button>
  );
};
