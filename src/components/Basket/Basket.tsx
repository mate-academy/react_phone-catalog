/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import { getBasket } from '../../store/index';
import { GoodsList } from './GoodsList';

export const Basket: React.FC = () => {
  const goodsList = useSelector(getBasket);
  const totalQuantity = goodsList.reduce((acc, value) => acc + value.quantity, 0);
  const totalPrice = goodsList.reduce(
    (acc, value) => acc + value.quantity * value.goodItem.price
    * (1 - value.goodItem.discount / 100), 0,
  );

  return (
    <div className="basket">
      <h2 className="basket__title">Cart</h2>
      {
        goodsList.length
          ? (
            <>
              <div className="basket__container">
                <GoodsList goodsList={goodsList} />
                <div className="basket__total">
                  <h1 className="basket__price">{`$${totalPrice}`}</h1>
                  <p className="basket__text">{`Total for ${totalQuantity} items`}</p>
                  <button type="button" onClick={() => {}} className="button card__button--add">Approve</button>
                </div>
              </div>
            </>
          )
          : <h3 className="basket__empty">Please add something to cart</h3>
      }

    </div>
  );
};
