import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CartContext } from '../CartContext';
import './CartItem.scss';

type Props = {
  product: Product,
  quantity: number,
};

export const CartItem: React.FC<Props> = ({
  product,
  quantity,
}) => {
  const {
    handleCart,
    handleProductQuantity,
  } = useContext(CartContext);

  const {
    id,
    name,
    type,
    imageUrl,
    discount,
    price,
  } = product;

  const productPrice = discount
    ? price * ((100 - discount) / 100)
    : price;

  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <button
          aria-label="deleteBtn"
          data-cy="cartDeleteButton"
          type="button"
          className="cart-item__delete-button"
          onClick={() => {
            handleCart(product);
          }}
        />
        <div className="cart-item__img-container">
          <img
            src={imageUrl}
            alt=""
            className="cart-item__img"
          />
        </div>
        <Link
          to={`../${type}s/${id}`}
          className="cart-item__link"
        >
          {name}
        </Link>
      </div>
      <div className="cart-item__price-info">
        <div className="cart-item__counter">
          <button
            aria-label="quantityDecr"
            type="button"
            disabled={quantity === 1}
            className="
              cart-item__button
              cart-item__button--decrease
              button
            "
            onClick={() => {
              handleProductQuantity(id, quantity, 'decrease');
            }}
          />
          <div
            className="cart-item__quantity"
            data-cy="productQuantity"
          >
            {quantity}
          </div>
          <button
            aria-label="quantityIncr"
            type="button"
            className="
              cart-item__button
              cart-item__button--increase
              button
            "
            onClick={() => handleProductQuantity(id, quantity, 'increase')}
          />
        </div>
        <div className="cart-item__price">
          {`$${productPrice * quantity}`}
        </div>
      </div>
    </li>
  );
};
