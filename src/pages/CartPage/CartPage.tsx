import './CartPage.scss';
import { useContext } from 'react';
import { Back } from '../../components/Back/Back';
import { CartList } from '../../components/CartList/CartList';
import { CartContext } from '../../contexts/CartContext';
import { Banner } from '../../components/Banner/Banner';

export const CartPage = () => {
  const { cart, deleteAll } = useContext(CartContext);
  const totalPrice = cart.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.price;
  }, 0);

  return (
    <div className="cart-page">
      <Back />

      <h1 className="cart-page__title">Cart</h1>

      {!cart.length
        ? <Banner message="Your cart is empty..." />
        : (
          <div className="cart-page__content">
            <CartList />
            <div className="cart-page__total">
              <h1 className="cart-page__total-title">{`$${totalPrice}`}</h1>
              <p className="cart-page__items">{`Total for ${cart.length} items`}</p>

              <div className="cart-page__line" />

              <button
                type="button"
                className="cart-page__button-checkout"
                onClick={deleteAll}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
