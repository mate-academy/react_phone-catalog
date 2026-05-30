import React, { useContext } from 'react';
import styles from './ToBuyButton.module.scss';
import { CartContext } from '../../context/CartContext';
import { Products } from '../../utils/types';
import classNames from 'classnames';
import { findMaxId } from '../../utils/functions';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  height: string;
  product: Products;
};

export const ToBuyButton: React.FC<Props> = ({ height, product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { isDarkTheme } = useTheme();

  const productExistinCart = cart.find(
    cartItem => cartItem.product.itemId === product.itemId,
  );

  const handleProductBuy = () => {
    setCart(prevCart => [
      ...prevCart,
      { id: findMaxId(cart), quantity: 1, product: product },
    ]);
  };

  return (
    <button
      style={{ height: `${height}px` }}
      className={classNames(styles.toBuyButton, {
        [styles['toBuyButton--dark']]: isDarkTheme,
        [styles['toBuyButton--exist']]: productExistinCart,
      })}
      onClick={!productExistinCart ? handleProductBuy : undefined}
      disabled={!!productExistinCart}
    >
      {productExistinCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
