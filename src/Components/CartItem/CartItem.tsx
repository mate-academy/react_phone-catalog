import React, { useContext } from 'react';
import { Product } from '../types/Product';
import { ProductsContext } from '../context/ProductsContext';
import { NavLink } from 'react-router-dom';
import './CartItem.scss';

type Props = {
  cartProduct: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ cartProduct, quantity }) => {
  const { increaseQuantity, decreaseQuantity, deleteFromCart } =
    useContext(ProductsContext);

  return (
    <div className="cartItem">
      <div className="cartItem__product">
        <button
          className="cartItem__product--button"
          onClick={() => {
            deleteFromCart(cartProduct.id);
          }}
        >
          <img
            src="/img/icons/Close.svg"
            alt="delete button"
            className="cartItem__product--button__img"
          />
        </button>

        <NavLink to={`../${cartProduct.category}/${cartProduct.id}`}>
          <img
            className="cartItem__product--image"
            src={`${cartProduct.image}`}
            alt={`${cartProduct.name}`}
          />
        </NavLink>

        <NavLink
          to={`../${cartProduct.category}/${cartProduct.id}`}
          className="cartItem__product--name"
        >
          {cartProduct.name}
        </NavLink>
      </div>

      <div className="cartItem__count">
        <div className="cartItem__count--buttons">
          <button
            className="cartItem__count--button"
            onClick={() => {
              decreaseQuantity(cartProduct.id);
            }}
          >
            -
          </button>
          <span className="cartItem__count--quantity">{quantity}</span>
          <button
            className="cartItem__count--button"
            onClick={() => {
              increaseQuantity(cartProduct.id);
            }}
          >
            +
          </button>
        </div>

        <p className="cartItem__count--price">{`$ ${cartProduct.price * quantity}`}</p>
      </div>
    </div>
  );
};
