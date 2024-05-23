/* eslint-disable max-len */
import { useContext, useEffect } from 'react';
import { CartList } from './CartList/CartList';
import { DispatchContext, StateContext } from '../../context/ContextReducer';

import './Cart.scss';
import { Checkout } from './CartCheckout/background/background';
import { CheckoutBord } from './CartCheckout/bord/bord';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

export const Cart: React.FC = () => {
  const { cartPhone, allPrices, totalCartItem, checkoutWindow, darkThem } =
    useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch({ type: 'resetPrices' });
      dispatch({ type: 'resetTotalCartItem' });
    };
  }, []);

  const handleClickCheckout = () => {
    dispatch({ type: 'setCheckout' });
  };

  return (
    <div className="Cart">
      {checkoutWindow && (
        <>
          <Checkout />
          <CheckoutBord />
        </>
      )}

      <div className="Cart__center">
        <div className="ItemCard__back Cart__center__back">
          <div className="Cart__center__back__chevron">
            <div className="ItemCard__path__chevron ItemCard__path__chevron__back"></div>
            <button
              onClick={() => {
                navigate(-1);
                dispatch({ type: 'resetAlsoLikeSLide' });
              }}
              className={cn('ItemCard__back__link', { dark: darkThem })}
            >
              Back
            </button>
          </div>

          <div className={cn('Cart__title', { dark: darkThem })}>Cart</div>
        </div>

        {cartPhone.length ? (
          <>
            <div className="Cart__items">
              <CartList devices={cartPhone} />
            </div>

            <div className={cn('Cart__total', { dark: darkThem })}>
              <div className="Cart__total__center">
                <p className="Cart__total__price">{`$${allPrices}`}</p>

                <p
                  className={cn('Cart__total__items', { dark: darkThem })}
                >{`Total for ${totalCartItem} items`}</p>

                <button
                  onClick={handleClickCheckout}
                  className={cn('Cart__total__button', { dark: darkThem })}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="Catalog__no-items Catalog__no-items--nonCatalog">
            <img
              className="Catalog__items__empty-img"
              src="https://olehmarushchak.github.io/react_phone-catalog/static/media/cart-is-empty.86ebaf664449a2f61e5e.png"
              alt="empty"
            />
          </div>
        )}
      </div>
    </div>
  );
};
