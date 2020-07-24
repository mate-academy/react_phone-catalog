import React from 'react';
import { useSelector } from 'react-redux';
import { getBasket } from '../store/index';
import { GoodsList } from './GoodsList';


export const Basket: React.FC = () => {
  const goodsList = useSelector(getBasket);
  console.log(goodsList)
  return (
    <div className="basket">
      <h2 className="basket__title">Cart</h2>
      {
        goodsList.length
        ? (
          <>
            <div className="basket__container">
              <GoodsList goodsList={goodsList} />
              {/* <TotalPrice /> */}
            </div>
          </>
        )
        : <h3 className="basket__empty">Please add something to cart</h3>
      }

    </div>
  );
}
