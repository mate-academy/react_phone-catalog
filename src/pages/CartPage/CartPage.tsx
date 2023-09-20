import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './CartItem';
import { CartContext } from '../../contexts/CartContext';

import './CartPage.scss';

export const CartPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = !cart.length ? 0 : cart.map((item) => {
    const priceAfterDiscount = item.price * ((100 - item.discount) / 100);
    const quantity = item.quantity || 1;

    return priceAfterDiscount * quantity;
  }).reduce((a, b) => a + b);

  let totalItems = 0;

  cart.forEach(item => {
    const quantity = item.quantity || 1;

    totalItems += quantity;
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = () => {
    setErrorMessage('We are sorry, but this feature is not implemented yet.');
  };

  return (
    <div className="CartPage">
      <div className="container container--with-min-height">
        <div className="CartPage__content">
          <div className="CartPage__breadcrumbs">
            <button
              type="button"
              data-cy="backButton"
              className="BackButton"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>

          <h1 className="CartPage__title">
            Cart
          </h1>

          <div className="CartPage__products-container">
            {!cart.length ? (
              <h2 className="CartPage__title--error">Cart is empty</h2>
            ) : (
              <>
                <div className="CartPage__products">
                  {cart.map(item => (
                    <CartItem
                      key={item.id}
                      product={item}
                    />
                  ))}
                </div>

                <div className="CartPage__checkout">
                  <h2 className="CartPage__amount">
                    {`$${totalAmount}`}
                  </h2>
                  <p className="CartPage__paragraph">
                    {`Total for ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
                  </p>
                  <button
                    type="button"
                    className="CartPage__button"
                    onClick={handleClick}
                  >
                    Checkout
                  </button>

                  {errorMessage && (
                    <p className="CartPage__error-message">{errorMessage}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
