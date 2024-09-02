import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { useShoppingCart } from '../../store/CartContext';
import { Product } from '../../types/Product';

type Props = {
  product?: Product;
  text: string;
};

export const Button: React.FC<Props> = ({ product, text }) => {
  const { shoppingCartProducts } = useShoppingCart();

  const addedToCart = shoppingCartProducts.find(
    item => item.id === product?.id,
  );

  return (
    <>
      <div
        className={classNames(styles.button, 'text-buttons', {
          [styles.button__disabled]: addedToCart,
        })}
      >
        {addedToCart ? 'Added to cart' : text}
      </div>
    </>
  );
};
