import './BasketMain.scss';
import BasketList from './BasketList/BasketList';
import BasketCheckout from './BasketCheckout/BasketCheckout';
import useAppContext from '../../useAppContext';
import Image from '../../../public/img/cart-is-empty.png';
import { Link, useNavigate } from 'react-router-dom';

const BasketMain = () => {
  const { showMessage, baskets } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="main-basket">
        <div className="main-basket__back-buttons" onClick={() => navigate(-1)}>
          <Link to="/" className="main-basket__icon--back"></Link>
          <span className="main-basket__text--back">Back</span>
        </div>
        <h2 className="main-basket__title">Cart</h2>
        <BasketList />
        <BasketCheckout />
        {showMessage && (
          <div className="main-basket__toast">Order placed successfully ✅</div>
        )}
        {baskets.length === 0 && (
          <div className="main-basket__zero">
            <h3 className="main-basket__title--zero">Your cart is empty</h3>
            <img
              src={Image}
              className="main-basket__zero--baskets"
              alt="Empty cart"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BasketMain;
