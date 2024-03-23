import { useContext, useState } from 'react';
import './CartPage.scss';
import { CartContext } from '../../contexts/CartContext';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { Product } from '../../types';
import { BASE_URL } from '../../helpers/constants';

export const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const preparedCart = cart
    .sort((item1, item2) => item1.name.localeCompare(item2.name))
    .reduce((uniqueItems, currentItem) => {
      const isItemExist = uniqueItems.find(item => item.id === currentItem.id);

      if (!isItemExist) {
        uniqueItems.push(currentItem);
      }

      return uniqueItems;
    }, [] as Product[]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleClearCart = () => {
    setCart([]);
    setShowConfirmation(false);
  };

  return (
    <div className="cart-page">
      <div className="cart-page__content">
        <BackButton />

        <h1 className="cart-page__title">
          Cart
        </h1>

        {!showConfirmation && (cart.length > 0 ? (
          <div className="cart-page__products">
            <ul className="cart-page__list">
              {preparedCart.map((product) => (
                <CartItem product={product} key={product.id} />
              ))}
            </ul>

            <div className="cart-page__checkout-block">
              <h2 className="cart-page__price">
                {`$${totalPrice}`}
              </h2>
              <p className="cart-page__total-amount">
                {cart.length === 1 ? 'Total for 1 item' : `Total for ${cart.length} items`}
              </p>
              <button
                type="button"
                className="cart-page__button button button--checkout"
                onClick={() => setShowConfirmation(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-page__empty-cart">
            <img
              src={`${BASE_URL}/img/cart-is-empty.png`}
              alt="cart is empty"
              className="cart-page__empty-cart-image"
            />

            <h2 className="cart-page__empty-cart-title">
              Your cart is empty
            </h2>
          </div>
        ))}

        {showConfirmation && (
          <div className="cart-page__confirmation">
            <p className="cart-page__confirmation-text">
              Checkout is not implemented yet.
              <br />
              Do you want to clear the Cart?
            </p>
            <div className="cart-page__confirmation-buttons">
              <button
                type="button"
                className="button cart-page__confirmation-button"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="button cart-page__confirmation-button"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
