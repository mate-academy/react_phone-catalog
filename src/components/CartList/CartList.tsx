import React, { FC } from 'react';
import { CartItem } from '../CartItem';
import { CartProduct } from '../../types/CartProduct';

type Props = {
  cartItems: CartProduct[];
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
};

export const CartList: FC<Props> = ({
  cartItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) => {
  return (
    <>
      {cartItems.map((item: CartProduct) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          imageUrl={item.imageUrl}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          onItemRemove={onRemoveFromCart}
        />
      ))}
    </>
  );
};
