import {
  useContext,
  useEffect,
  useState,
} from 'react';

import './style.scss';
import { DispatchContext, StateContext } from '../Store';
import { getCartItems } from '../../helpers/getCartItems';

export const CartTotal = () => {
  const { cartItems, totalCost } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [clicked, setClicked] = useState(false);
  const totalItems = getCartItems(cartItems);

  const calculateTotal = () => {
    const totalCostPrice = cartItems.map((el) => {
      const { price, fullPrice } = el.product;
      const totalCostItems = (el.discount ? price : fullPrice) * el.quantity;

      return (
        totalCostItems
      );
    }).reduce((sum, n) => sum + n, 0);

    dispatch({
      type: 'UPDATE_PRICE',
      payload: totalCostPrice,
    });
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setClicked(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [clicked]);

  return (
    <div className="cartPage__total totalCart">
      <div className="totalCart__container">
        <h1 className="totalCart__price">
          {`$${totalCost}`}
        </h1>

        <h4 className="totalCart__subtitle">
          {`Total for ${totalItems} items`}
        </h4>

        <span className="totalCart__line" />

        {clicked && (
          <div className="totalCart__message">
            We are sorry
            but this feature
            is not implemented yet
          </div>
        )}
        <button
          className="totalCart__btn"
          type="button"
          onClick={() => setClicked(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
