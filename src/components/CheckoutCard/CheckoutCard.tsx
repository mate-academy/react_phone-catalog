import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductInCart } from '../../types/Product';
import { AppContext } from '../../context/AppContextProvider';
import './checkoutCard.scss';

export type Props = {
  item: ProductInCart;
};

export const CheckoutCard:React.FC<Props> = ({ item }) => {
  const { toggleToCart, updateCountInCart } = useContext(AppContext);
  const [count, setCount] = useState(item.count);

  useEffect(() => {
    updateCountInCart(item.itemId, count);
  }, [item.itemId, count]);

  const totalPrice = () => {
    return item.price * count;
  };

  const handleDecrease = () => {
    setCount((prevCount: number) => prevCount - 1);
  };

  const handleIncrease = () => {
    setCount((prevCount: number) => prevCount + 1);
  };

  return (
    <div className="checkout-card">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        data-cy="cartDeleteButton"
        className="checkout-card__button-remove"
        onClick={() => toggleToCart(item)}
      />
      <div className="checkout-card__content">
        <img
          alt={item.name}
          src={item.image}
          className="checkout-card__img"
        />
        <Link className="checkout-card__title" to={`/${item.category}/${item.itemId}`}>
          {item.name}
        </Link>
      </div>
      <div className="checkout-card__container">
        <div className="checkout-card__actions">
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className={classNames(
              'checkout-card__button checkout-card__button_prev',
              { disabled: count === 1 },
            )}
            onClick={handleDecrease}
          />
          <div className="checkout-card__count">
            {count}
          </div>
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="checkout-card__button checkout-card__button_next"
            onClick={handleIncrease}
          />
        </div>
        <p className="checkout-card__price">
          {`$${totalPrice()}`}
        </p>
      </div>
    </div>
  );
};
