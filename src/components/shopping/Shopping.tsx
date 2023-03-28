import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../reducer';
import { ShoppingProduct } from '../../types/shoppingProduct';
import { Way } from '../way/Way';
import { ShoppingCard } from './cardPrice/CardPrice';

import './shopping.scss';

export const Shopping = () => {
  const [state] = useContext(GlobalContext);
  const [totalCost, setTotalCost] = useState(0);

  const getPrice = (product: ShoppingProduct) => {
    return (
      product.item.price - (product.item.price / 100) * product.item.discount
    );
  };

  useEffect(() => {
    setTotalCost(
      state.basketList
        .map((el: ShoppingProduct) => {
          return getPrice(el) * el.value;
        })
        .reduce((acc, el) => acc + el, 0),
    );
  }, [state.basketList]);

  return (
    <div className="wrapper-shopping">
      <Way />
      <h1>Cart</h1>
      <div className="main-info-shopping">
        {state.basketList.length ? (
          <>
            <div className="wrapper-shopping-cards">
              {state.basketList.map((product: ShoppingProduct) => (
                <ShoppingCard product={product} key={product.item.age} />
              ))}
            </div>
            <div className="total-info" data-cy="productQauntity">
              <div className="total-info__cost">
                <h2>{`$${totalCost}`}</h2>
                <span>{`Total for ${state.basketList.length} items`}</span>
              </div>
              <div className="total-info__checkout">
                <button type="button">Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <div>list shopping empty please choose product</div>
        )}
      </div>
    </div>
  );
};
