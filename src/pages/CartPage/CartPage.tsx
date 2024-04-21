import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './components/CartItem';
import { useAppSelector } from '../../app/hooks';
import { AddButton } from '../../components/AddButton';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useAppSelector(state => state.cart);

  return (
    <div className="container">
      <div className="back">
        <div className="back__arrow"></div>
        <button className="back__btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="page__title">Cart</div>
      <div className="cart">
        <div className="cart__list">
          {cart.map(cartItem => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </div>
        <div className="cart__total">
          <div className="cart__total-price">{`$${totalPrice}`}</div>
          <div className="cart__total-quantity">{`Total for ${cart.length} items`}</div>
          <div className="cart__divider"></div>
          <AddButton text="Checkout" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
