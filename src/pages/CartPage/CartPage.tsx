import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './components/CartItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddButton } from '../../components/AddButton';
import { clearCart } from '../../features/cartSlice';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, totalPrice, totalInCart } = useAppSelector(state => state.cart);

  const handleCheckout = () => {
    const confirmCheckout = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmCheckout) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="container">
      <div className="back">
        <div className="back__arrow"></div>
        <button className="back__btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      {cart.length > 0 ? (
        <>
          <div className="cart__title">Cart</div>
          <div className="cart">
            <div className="cart__list">
              {cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
            <div className="cart__total">
              <div className="cart__total-price">{`$${totalPrice}`}</div>
              <div className="cart__total-quantity">{`Total for ${totalInCart} items`}</div>
              <div className="cart__divider"></div>
              <AddButton text="Checkout" onClick={handleCheckout} />
            </div>
          </div>
        </>
      ) : (
        <div className="cart__empty">
          <div className="cart__empty-message">Your cart is empty</div>
          <img
            src="img/cart-is-empty.png"
            alt="Empty cart"
            className="cart__empty-img"
          />
        </div>
      )}
    </div>
  );
};
