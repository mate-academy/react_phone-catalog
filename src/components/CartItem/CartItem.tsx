/* eslint-disable no-param-reassign */
import React from 'react';
import './CartItem.module.scss';
import { UseAppDispatch, useAppSelector } from '../../utils/store';
import { actions as cartActions } from '../../utils/cart';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { id, name, price, image } = product;

  const dispatch = UseAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const takeFromCart = () => dispatch(cartActions.takeItems(product));
  const handleMinus = () => dispatch(cartActions.takeItem(product.id));
  const handlePlus = () => dispatch(cartActions.addItem(product));

  const amount = cart.filter(el => el.id === id).length;

  return (
    <div className="cart__item" key={id}>
      <div className="cart__item__top">
        <button className="close__icon" onClick={takeFromCart}></button>
        <Link
          to={`../../${product.category}/${product.itemId}`}
          state={product}
          className="image__holder"
        >
          <img src={image} alt="image" className="cart__item__image" />
        </Link>
        <Link
          to={`../../${product.category}/${product.itemId}`}
          state={product}
          className="cart__item__title"
        >
          {name}
        </Link>
      </div>
      <div className="cart__item__bottom">
        <div className="cart__item__quantity">
          <div className="cart__item__quantity__icon">
            <button className="minus__icon" onClick={handleMinus}></button>
          </div>
          <div className="cart__item__quantity__icon">
            <span className="cart__item__quantity__counter">{amount}</span>
          </div>
          <div className="cart__item__quantity__icon">
            <button className="plus__icon" onClick={handlePlus}></button>
          </div>
        </div>
        <h2 className="cart__item__price">${price * amount}</h2>
      </div>
    </div>
  );
};
