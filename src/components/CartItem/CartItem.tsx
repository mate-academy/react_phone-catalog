import React, { useContext } from 'react';
import './CartItem.scss';
import { Product } from '../types/Product';
import { ProductsContext } from '../context/ProductsContext';

type Props = {
  cartProduct: Product;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { deleteFromCart } = useContext(ProductsContext);

  return (
    <div className="cart-item">
      <div className="cart-item__product-block">
        <button
          className="cart-item__product-block__button"
          onClick={() => deleteFromCart(cartProduct.id)}
        >
          <img src="../../../public/img/Delete.svg" alt="delete-button" />
        </button>

        <a href="">
          <img
            className="cart-item__product-block__image"
            src={`${cartProduct.image}`}
            alt={`${cartProduct.itemId}`}
          />
        </a>

        <a href="" className="cart-item__product-block__name">
          {cartProduct.name}
        </a>
      </div>

      <div className="cart-item__count-block">
        <div className="cart-item__count-block__buttons">
          <button className="cart-item__count-block__button">-</button>
          <span className="cart-item__count-block__count"> 1 </span>
          <button className="cart-item__count-block__button">+</button>
        </div>

        <p className="cart-item__count-block__price">{cartProduct.price}</p>
      </div>
    </div>
  );
};
