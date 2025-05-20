import React, { useContext } from 'react';
import './CartItem.scss';
import { Product } from '../types/Product';
import { ProductsContext } from '../context/ProductsContext';
import { NavLink } from 'react-router-dom';

type Props = {
  cartProduct: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ cartProduct, quantity }) => {
  const { deleteFromCart, increaseQuantity, decreaseQuantity } =
    useContext(ProductsContext);

  return (
    <div className="cart-item">
      <div className="cart-item__product-block">
        <button
          className="cart-item__product-block__button"
          onClick={() => deleteFromCart(cartProduct.id)}
        >
          <img src="../../../public/img/Delete.svg" alt="delete-button" />
        </button>

        <NavLink to={`../${cartProduct.category}/${cartProduct.itemId}`}>
          <img
            className="cart-item__product-block__image"
            src={`${cartProduct.image}`}
            alt={`${cartProduct.itemId}`}
          />
        </NavLink>

        <NavLink
          to={`../${cartProduct.category}/${cartProduct.itemId}`}
          className="cart-item__product-block__name"
        >
          {cartProduct.name}
        </NavLink>
      </div>

      <div className="cart-item__count-block">
        <div className="cart-item__count-block__buttons">
          <button
            className="cart-item__count-block__button"
            onClick={() => decreaseQuantity(cartProduct.id)}
          >
            -
          </button>
          <span className="cart-item__count-block__count">{quantity}</span>
          <button
            className="cart-item__count-block__button"
            onClick={() => increaseQuantity(cartProduct.id)}
          >
            +
          </button>
        </div>

        <p className="cart-item__count-block__price">
          {`$ ${cartProduct.price * quantity}`}
        </p>
      </div>
    </div>
  );
};
