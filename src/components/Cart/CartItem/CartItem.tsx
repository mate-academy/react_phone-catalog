import { FC } from 'react';
import iphone from '../../../img/categories/phones.png';
import './CartItem.scss';
import { CartItem as CartItemType } from '../../../types/CartItem';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: FC<Props> = ({ cartItem }) => {
  const { quantity, product } = cartItem;

  return (
    <div className="cart-item">
      <button
        type="button"
        aria-label="delete-item"
        className="cart-item__delete"
        data-cy="cartDeleteButton"
      />
      <div className="cart-item__product">
        <img
          src={iphone}
          alt="cart-item"
          className="cart-item__img"
        />
        <h4 className="cart-item__title">
          {product.name}
        </h4>
      </div>
      <div
        className="cart-item__quantity-container"
        data-cy="productQauntity"
      >
        <button
          type="button"
          aria-label="decrement-products-in-cart"
          className="cart-item__button cart-item__minus"
        />
        <span className="cart-item__quantity">{quantity}</span>
        <button
          type="button"
          aria-label="increment-products-in-cart"
          className="cart-item__button cart-item__plus"
        />
      </div>
      <span className="cart-item__price">{product.price}</span>
    </div>
  );
};
