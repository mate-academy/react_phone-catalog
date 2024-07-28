import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CartItem as CartItemType } from '../../types/CartItem';
import { Product } from '../../types/Product';
import {
  increaseQuantity as add,
  decreaseQuantity as reduce,
  takeProduct,
} from '../../features/cartReducer';
import './CartItem.scss';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const carts: CartItemType[] = useAppSelector(state => state.cart.items);
  const cart = carts.find(item => item.id === product.itemId);

  const addCount = () => {
    if (cart) {
      dispatch(add(cart.id));
    }
  };

  const reduceCount = () => {
    if (cart) {
      dispatch(reduce(cart.id));
    }
  };

  const take = () => {
    if (cart) {
      dispatch(takeProduct(cart.id));
    }
  };

  return (
    <div className="cartItem">
      <div className="cartItem__main">
        <button onClick={take} className="cartItem__delete" />

        <div className="cartItem__img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="cartItem__img"
          />
        </div>

        <p className="cartItem__name">{product.name}</p>
      </div>

      <div className="cartItem__details">
        <div className="cartItem__controls">
          <button
            className={classNames('cartItem__controls__buttons', {
              'cartItem__controls__buttons--disabled': cart?.quantity === 1,
            })}
            onClick={reduceCount}
            disabled={cart?.quantity === 1}
          >
            -
          </button>
          <span>{cart?.quantity}</span>
          <button className="cartItem__controls__buttons" onClick={addCount}>
            +
          </button>
        </div>

        <p className="cartItem__price">
          ${cart ? product.price * cart.quantity : product.price}
        </p>
      </div>
    </div>
  );
};
