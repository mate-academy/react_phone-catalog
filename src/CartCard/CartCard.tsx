import React, { useContext } from 'react';
import './CardCard.scss';
import { Product } from '../Types/products';
import { CartContext } from '../utils/contexts';

type Props = {
  product: Product;
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return;
  }

  const { cart, setCart } = cartContext;

  const deleteFromCart = () => {
    setCart(cart.filter(cartProduct => cartProduct.id !== product.id));
  };

  const addQuantity = () => {
    setCart(
      cart.map(cartProduct =>
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: (cartProduct.quantity ?? 0) + 1 }
          : cartProduct,
      ),
    );
  };

  const removeQuantity = () => {
    setCart(
      cart.map(cartProduct => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: Math.max((cartProduct.quantity ?? 1) - 1, 1),
          };
        }

        return cartProduct;
      }),
    );
  };

  return (
    <div className="cart-card">
      <div className="cart-card__top">
        <div className="cart-card__icon" onClick={deleteFromCart}></div>
        <img
          src={`./${product.image}`}
          className="cart-card__image"
          alt={product.name}
        />
        <span className="cart-card__product-name">{product.name}</span>
      </div>
      <div className="cart-card__bottom">
        <div className="cart-card__buttons">
          <button
            className="cart-card__button cart-card__button--minus"
            onClick={removeQuantity}
            disabled={product.quantity === 1}
          ></button>
          <span className="cart-card__amount">{product.quantity}</span>
          <button
            className="cart-card__button cart-card__button--plus"
            onClick={addQuantity}
          ></button>
        </div>
        <span className="cart-card__price">{`$${product.price}`}</span>
      </div>
    </div>
  );
};
