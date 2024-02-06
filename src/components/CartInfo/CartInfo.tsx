import { useContext } from 'react';
import { MainContext } from '../../context';
import './cart-info.scss';

export const CartInfo = () => {
  const {
    cartItems,
  } = useContext(MainContext);

  return (
    <div className="cart-total__block">
      <p className="total-price">3320$</p>
      {cartItems.length === 1
        ? <p className="total-item">{`Total for ${cartItems.length} item`}</p>
        : <p className="total-item">{`Total for ${cartItems.length} items`}</p> }
      <button
        type="button"
        className="button primary__button total-price__button"
      >
        Checkout
      </button>
    </div>
  );
};
