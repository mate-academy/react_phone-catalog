import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from '../../store/slices/cartSlice';
import './CartItem.scss';
import { CartItemType } from '../../helpers/types/CartItemType';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/ButtonType';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, quantity, id } = cartItem;
  const dispatch = useDispatch();

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(id));
  };

  const handleIncreaseCount = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseCount = () => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__wrapper">
        <div className="cart-item__info">
          <Button
            content={ButtonType.CLOSE}
            className="cart-item__info-close"
            onClick={handleDeleteFromCart}
            data-cy="cartDeleteButton"
          />

          <div className="cart-item__info-image-wrapper">
            <Link to={`/${product.category}/${product.phoneId}`}>
              <img
                src={`new/${product.image}`}
                alt={product.name}
                className="cart-item__info-image"
              />
            </Link>
          </div>

          <Link
            to={`/${product.category}/${product.phoneId}`}
            className="cart-item__info-name"
          >
            {product.name}
          </Link>
        </div>

        <div className="cart-item__count">
          <div className="cart-item__count-wrapper">
            <Button
              content={ButtonType.MINUS}
              disabled={quantity === 1}
              onClick={handleDecreaseCount}
            />
            <p
              className="cart-item__count-number"
              data-cy="productQauntity"
            >
              {quantity}
            </p>
            <Button content={ButtonType.PLUS} onClick={handleIncreaseCount} />
          </div>

          <h2 className="cart-item__price">{`$${quantity * product.price}`}</h2>
        </div>
      </div>
    </div>
  );
};
