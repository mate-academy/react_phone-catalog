import { CartItem } from './components/CartItem';
import { AppContext } from '../../AppContext';
import { useContext } from 'react';
import { BackBtn } from '../../components/BackBtn';

export const ShoppingCartPage = () => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const confirmClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmClear) {
      setCartItems([]);
    }
  };

  return (
    <section className="cart">
      <div className="container">
        <BackBtn className="cart__back-btn" />

        <div className="cart__content">
          <h1 className="cart__title page-title">Cart</h1>

          <ul className="cart__list">
            {cartItems.map(product => (
              <li className="cart__item" key={product.id}>
                <CartItem product={product} />
              </li>
            ))}
          </ul>

          <div className="cart__info">
            {cartItems.length > 0 ? (
              <>
                <span className="cart__total-price">{`$${totalPrice}`}</span>
                <p className="cart__info-text">Total for 3 items</p>
              </>
            ) : (
              <span className="cart__info-text">Your cart is empty</span>
            )}
            <button
              className="cart__info-btn button"
              type="button"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
