import React, { useContext } from 'react';
import './CartItem.scss';
import { ShoppingCartProduct } from '../../../../types/ShoppingCartProduct';
import { GlobalContext } from '../../../../store/GlobalContext';

type Props = {
  cartProduct: ShoppingCartProduct;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { updateQuantity } = useContext(GlobalContext);

  return (
    <div className="cartItem">
      <button
        className="cartItem__icon-close"
        onClick={() => updateQuantity(cartProduct.id, 0)} // Удалить товар
      ></button>
      <img
        src={cartProduct.product.image}
        alt="Image product"
        className="cartItem__image"
      />
      <span className="cartItem__title">{cartProduct.product.name}</span>

      <div className="cartItem__counter-container">
        <button
          className={`${
            cartProduct.quantity === 1
              ? 'cartItem__icon-minus cartItem__icon-minus--disabled'
              : 'cartItem__icon-minus'
          }`}
          onClick={() => {
            if (cartProduct.quantity > 1) {
              updateQuantity(cartProduct.id, cartProduct.quantity - 1); // Уменьшаем количество
            }
          }}
        ></button>
        <span className="cartItem__counter">{cartProduct.quantity}</span>
        <button
          className="cartItem__icon-plus"
          onClick={() => {
            updateQuantity(cartProduct.id, cartProduct.quantity + 1); // Увеличиваем количество
          }}
        ></button>
      </div>

      <span className="cartItem__price">{`$${cartProduct.product.price}`}</span>
    </div>
  );
};
