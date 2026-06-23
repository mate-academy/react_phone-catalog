/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import styles from './CartButton.module.scss';
import type { Product } from '../../../types/types';
import { useApp } from '../../../providers/context';

interface Props {
  product: Product;
}

export const CartButton = ({ product }: Props) => {
  const [isInCart, setIsInCart] = useState(false);

  const { cart, setCart } = useApp();

  useEffect(() => {
    setIsInCart(cart.some(item => item.id === product.id));
  }, [cart, product.id]);

  const toggleCart = () => {
    const existingindex = cart.findIndex(item => item.id === product.id);

    let newCart;

    if (existingindex === -1) {
      const productToAdd = {
        ...product,
        quantity: 1,
      };
      newCart = [...cart, productToAdd];
    } else {
      newCart = cart.filter(item => item.id !== product.id);
    }

    setCart(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <button
      className={isInCart ? styles.cartButtonFalse : styles.cartButtonTrue}
      onClick={toggleCart}
      title={isInCart ? 'Remove from cart' : 'Add to cart'}
    >
      {isInCart ? 'Added' : 'Add to cart'}
    </button>
  );
};
