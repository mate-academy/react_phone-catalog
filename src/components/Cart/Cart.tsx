import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProductType } from '../../helpers/types/ProductType';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { BASE_URL } from '../../helpers/utils/constants';
import './Cart.scss';
import { removeFromCart } from '../../features/cartSlice';

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

  const handleCloseClick = () => {
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
      <Link to={`/${category}/${phoneId}`} className="cart__block">
        <ButtonIcon
          type="event"
          shape="close"
          dynamicClasses={['no-border']}
          onClick={handleCloseClick}
        />

        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          className="cart__image"
        />

        <p className="cart__name">{name}</p>
      </Link>

      <div className="cart__block cart__block--right">
        <div className="cart__increment">
          <ButtonIcon
            type="event"
            shape="minus"
            onClick={() => decrease()}
          />
          <p className="cart__count">{count}</p>

          <ButtonIcon
            type="event"
            shape="plus"
            disable={count <= 0}
            onClick={() => increase()}
          />
        </div>

        <div className="cart__price">{`$${price}`}</div>
      </div>
    </div>
  );
};
