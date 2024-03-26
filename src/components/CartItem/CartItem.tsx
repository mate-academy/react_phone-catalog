import React from 'react';
import './CartItem.scss';
import { CartProduct } from '../../types/CartProduct';
import { Product } from '../../types/Product';

type Props = {
  item: CartProduct;
  incrementCartProductQuantity: (el: Product) => void;
  decrementCartProductQuantity: (el: Product) => void;
  removeCartItemFromLSCart: (el: CartProduct) => void;
};
export const CartItem: React.FC<Props> = ({
  item,
  decrementCartProductQuantity,
  incrementCartProductQuantity,
  removeCartItemFromLSCart,
}) => {
  return (
    <li className="cart-item">
      <button
        className="cart-item__button--delete"
        type="button"
        aria-label="delete item from cart"
        data-cy="cartDeleteButton"
        onClick={() => removeCartItemFromLSCart(item)}
      />
      <img
        src={item.product.image}
        alt={item.product.name}
        className="cart-item--image"
      />
      <p className="cart-item--title">{item.product.name}</p>
      <div className="cart-item__quantity-block">
        <button
          className="cart-item__button--minus"
          type="button"
          aria-label="minus one item quantity from cart"
          disabled={item.quantity === 1}
          onClick={() => decrementCartProductQuantity(item.product)}
        />
        <p className="cart-item--quantity">{item.quantity}</p>
        <button
          className="cart-item__button--plus"
          type="button"
          aria-label="plus one item quantity to cart"
          onClick={() => incrementCartProductQuantity(item.product)}
        />
      </div>
      <p className="cart-item--price">${item.product.price}</p>
    </li>
  );
};
