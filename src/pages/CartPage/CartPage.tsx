import classNames from 'classnames';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { CartItem } from '../../components/CartItem';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { ProductContext } from '../../helpers/ProductsContext';
import './CartPage.scss';

export function CartPage() {
  const {
    addedToCart, setCartPrices, totalPrices,
  } = useContext(ProductContext);
  const [isMessage, setIsMessage] = useState(false);

  const messageHandler = useCallback(() => {
    setIsMessage(true);

    const timer = setTimeout(() => setIsMessage(false), 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const newValue = addedToCart.map(obj => {
      const amountFromStorage = localStorage.getItem(`${obj.phoneId}amount`);

      return {
        phoneId: obj.phoneId,
        price: obj.price,
        amount: amountFromStorage ? +amountFromStorage : 1,
      };
    });

    setCartPrices(newValue);
  }, [addedToCart]);

  return (
    <>
      <GoBackButton />
      <section className="cart">
        <h1 className="cart__title">Cart</h1>

        {addedToCart.length === 0
          ? (<p className="cart__empty">Your cart is empty</p>)
          : (
            <div className="cart__container">
              <div className="cart__chosen-items">
                {addedToCart.map(item => (
                  <div key={item.phoneId}>
                    <CartItem
                      product={item}
                    />
                  </div>
                ))}
              </div>

              <div className="cart__total">
                <div className="cart__price-container">
                  <p className="cart__price">
                    {`$${totalPrices}`}
                  </p>
                  <p className="cart__price-description">
                    {`Total for ${addedToCart.length} items`}
                  </p>
                </div>
                <button
                  type="button"
                  className="wide-button wide-button--high"
                  onClick={() => messageHandler()}
                >
                  Checkout
                </button>
                <p
                  className={classNames(
                    'cart__message',
                    { 'cart__message--active': isMessage },
                  )}
                >
                  We are sorry, but this feature is not implemented yet
                </p>
              </div>
            </div>
          )}
      </section>
    </>
  );
}
