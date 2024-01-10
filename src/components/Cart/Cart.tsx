import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProductType } from '../../helpers/types/ProductType';
import { BASE_URL } from '../../helpers/utils/constants';
import './Cart.scss';
import { ButtonEvent } from '../../elements/Buttons/ButtonEvent/ButtonEvent';
import { useAppSelector } from '../../store/hooks';
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from '../../features/cartSlice';

type Props = {
  product: ProductType;
};

export const Cart: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const { count } = useAppSelector(state => state.cart);
  const {
    name,
    image,
    price,
    category,
    phoneId,
    id,
  } = product;

  const close = () => {
    dispatch(removeFromCart(product.id));
  };

  const increase = () => {
    dispatch(increaseCount(id));
  };

  const decrease = () => {
    if (count[id] > 1) {
      dispatch(decreaseCount(id));
    }
  };

  return (
    <div className="cart">
      <div className="cart__close">
        <ButtonEvent
          shape="close"
          onClick={close}
          dynamicClasses={['no-border']}
        />
      </div>

      <Link
        to={`/${category}/${phoneId}`}
        className="cart__block"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      >
        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          className="cart__image"
        />

        <p className="cart__name">{name}</p>
      </Link>

      <div className="cart__block cart__block--right">
        <div className="cart__increment">
          <ButtonEvent
            shape="minus"
            onClick={() => decrease()}
            disable={count[id] === 1}
          />

          <p className="cart__count">{count[id]}</p>

          <ButtonEvent
            shape="plus"
            onClick={() => increase()}
          />
        </div>

        <div className="cart__price">{`$${price}`}</div>
      </div>
    </div>
  );
};
