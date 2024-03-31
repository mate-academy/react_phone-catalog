import './CartPage.scss';
import { useState, useContext, useEffect } from 'react';
import { CartItem } from './CartItem';
import { StateContext } from '../../AppContext';
import { NoResults } from '../NoResults/NoResults';
import { Product } from '../../types';
import { getUniqueItems } from '../../helpers/utils';
import { BackButton } from '../../components/BackButton/BackButton';
import PopUp from '../../components/PopUp';

export const CartPage: React.FC = () => {
  const [cartSummary, setCartSummary] = useState<number>(0);
  const { state } = useContext(StateContext);
  const [uniqueItems, setUniqueItems] = useState<Array<Product>>();

  const uniqueItemsLocal = getUniqueItems(state.card);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setUniqueItems(uniqueItemsLocal);
  }, [getUniqueItems(state.card).length]);

  useEffect(() => {
    let totalSumm = 0;

    state.card.map(elem => {
      totalSumm += +elem.price.slice(1);

      return totalSumm;
    });
    setCartSummary(totalSumm);
  }, [state.card]);

  const addItem = (amountItem: number) => {
    setCartSummary(prevState => +prevState + amountItem);
  };

  const deleteItem = (amount: number) => {
    setCartSummary(prevState => +prevState - amount);
  };

  return (
    <div className="mb-80 mt-24 parent">
      <div className="">
        <BackButton />
        <div className="cart-box">
          <div>
            {state.card.length > 0 ? (
              uniqueItems?.map(elem => {
                return (
                  <CartItem
                    summary={addItem}
                    reduce={deleteItem}
                    phone={elem}
                    key={elem.id}
                  />
                );
              })
            ) : (
              <NoResults headline="Your cart is empty" />
            )}
          </div>

          <div className="summary">
            <div>{cartSummary}</div>
            <div className="mb-24">
              Total for
              {state.card.length}
              {' '}
              items
            </div>
            <div className="grey-line mb-24" style={{ width: '90%' }} />
            <div
              className="summary-button"
              onClick={() => setShowPopUp(true)}
              onKeyDown={() => setShowPopUp(true)}
              role="button"
              tabIndex={0}
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
      {showPopUp && (
        <PopUp />
      )}
    </div>
  );
};
