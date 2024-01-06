import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProductType } from '../../helpers/types/ProductType';
import { BASE_URL } from '../../helpers/utils/constants';
import './Cart.scss';
import { removeFromCart } from '../../features/cartSlice';
import { ButtonEvent } from '../../elements/Buttons/ButtonEvent/ButtonEvent';

type Props = {
  product: ProductType;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export const Cart: React.FC<Props> = ({ product, setTotalPrice }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const {
    name,
    image,
    price,
    category,
    phoneId,
  } = product;

  const close = () => {
    dispatch(removeFromCart(product.id));
    setTotalPrice(cur => cur - price);
  };

  const increase = () => {
    setCount(cur => (cur + 1));
    setTotalPrice(cur => cur + price);
  };

  const decrease = () => {
    setCount(cur => (cur > 1 ? cur - 1 : 1));
    setTotalPrice(cur => {
      return cur - price > 0 ? cur - price : price;
    });
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

      <Link to={`/${category}/${phoneId}`} className="cart__block">
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
            disable={count === 1}
          />

          <p className="cart__count">{count}</p>

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
