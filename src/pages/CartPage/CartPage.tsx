import './CartPage.scss';
import { useState, useContext, useEffect } from 'react';
import { CartItem } from './CartItem';
import { StateContext } from '../../AppContext';

export const CartPage: React.FC = () => {
  const [cartSummary, setCartSummary] = useState<number>(0);
  const { state } = useContext(StateContext);

  useEffect(() => {
    let totalSumm = 0;

    state.card.map((elem) => {
      totalSumm += +elem.price.slice(1);

      return totalSumm;
    });
    setCartSummary(totalSumm);
  }, []);

  const addItem = (amountItem: number) => {
    setCartSummary(prevState => +prevState + amountItem);
  };

  const deleteItem = (amount: number) => {
    setCartSummary(prevState => +prevState - amount);
  };

  return (
    <div className="cart-container mb-80 mt-24">

      <div className="cart-item-container">
        {state.card.length > 0
          && state.card.map(elem => {
            const key = elem.id;

            return (
              <CartItem
                summary={addItem}
                reduce={deleteItem}
                phone={elem}
                key={key}
              />
            );
          })}
      </div>

      <div className="summary">
        <div>{cartSummary}</div>
        <div className="mb-24">
          Total for
          {' '}
          {state.card.length}
          {' '}
          items
        </div>
        <div className="grey-line mb-24" style={{ width: 320 }} />
        <div className="summary-button">Checkout</div>
      </div>
    </div>
  );
};
