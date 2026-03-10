import React from 'react';
//import styles from './CartItems.module.scss';
import { Product } from '../../../public/api/types/Product';

type CartItemsProps = {
  product: Product;
  quantity: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
  handleRemoveFromCart: () => void;
};

export const CartItems: React.FC<CartItemsProps> = ({
  product,
  quantity,
  handleDecrease,
  handleIncrease,
  handleRemoveFromCart,
}) => {
  return (
    <>
      <img src={product.image} alt={product.title} />
      <div>{product.title}</div>
      <div>
        <button onClick={handleDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <div>{(Number(product.price) * quantity).toFixed(2)}</div>
      <button onClick={handleRemoveFromCart}>x</button>
    </>
  );
};
