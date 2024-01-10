import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ButtonBack } from '../components/ButtonBack/ButtonBack';
import { StorContext } from '../context/StorContext';
import { CartCard } from '../components/CartCatd/CartCatd';
import { CartDetale } from '../types/CartDetale';
import '../styles/CartPage.scss';

export const CartPage = () => {
  const { inCartCount, inCart } = useContext(StorContext);
  const [checkout, setCheckout] = useState(false);

  const totalSum = inCart.reduce(
    (acc: number, el: CartDetale) => acc + el.price * el.quantity,
    0,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckout(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [checkout]);

  return (
    <div className="cart">
      <div className="cart__navigate">
        <ButtonBack />
      </div>

      <h1 className="cart__title">Cart</h1>

      {inCartCount === 0 ? (
        <h2 className="cart__empty">Your cart is empty!</h2>
      ) : (
        <>
          <div className="cart__container grid grid--block">
            <div className="
              cart__products
              grid__item--desktop-1-16
              grid__item--tablet-1-8"
            >
              {inCart.map((prod) => (
                <CartCard key={prod.id} product={prod} />
              ))}
            </div>

            <div className="
              cart__total
              grid__item--desktop-17-24
              grid__item--tablet-9-12"
            >
              <div className="cart__info">
                <h2 className="cart__info-price">{`$${totalSum}`}</h2>
                <p className="cart__info-count">
                  {`Total for ${inCartCount} items`}
                </p>
              </div>

              <button
                type="button"
                className="cart__button"
                onClick={() => {
                  setCheckout(true);
                }}
              >
                Checkout
              </button>

              <div className={classNames('cart__message',
                { 'cart__message--clear': checkout })}
              >
                <p>Function does not work &#128577;</p>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};
