import { useContext, useState } from 'react';
import { CartContext } from '../../store/SavedProductsContext';
import { CartItem } from './CartItem';
import { getPriceAfterDiscount } from '../../helpers/utils';
import { BackButton } from '../../components/BackButton';

import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  const totalAmount = !cartItems.length ? 0 : cartItems.map((item) => {
    const priceAfterDiscount = getPriceAfterDiscount(item.price, item.discount);
    const quantity = item.quantity || 1;

    return priceAfterDiscount * quantity;
  }).reduce((a, b) => a + b);

  let totalItems = 0;

  cartItems.forEach(item => {
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
            <BackButton />
          </div>

          <h1 className="CartPage__title">
            Cart
          </h1>

          <div className="CartPage__products-container">
            {!cartItems.length ? (
              <h2 className="CartPage__title--error">Cart is empty</h2>
            ) : (
              <>
                <div className="CartPage__products">
                  {cartItems.map(item => (
                    <CartItem key={item.id} product={item} />
                  ))}
                </div>

                <div className="CartPage__checkout">
                  <h2 className="CartPage__amount">
                    {String.fromCodePoint(0x00024) + totalAmount}
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
