import React, { useContext, useEffect, useMemo } from 'react';
import { CatalogContext } from '../Contexts/CatalogContext';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Popup } from '../Popup';

export const CartPage: React.FC = () => {
  const { cart, popup, setPopup } = useContext(CatalogContext);
  const { state } = useLocation();
  const backPath = state?.location.pathname ? state?.location.pathname : `/`;

  const totalCount = useMemo(() => {
    return cart.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
  }, [cart]);

  const totalSum = useMemo(() => {
    return cart.reduce((sum, currentValue) => {
      return sum + currentValue.quantity * currentValue.product.price;
    }, 0);
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = popup ? 'hidden' : 'auto';
  }, [popup]);

  return (
    <>
      <div className="breadcrumbs breadcrumbs--back">
        <div className="breadcrumbs__divider breadcrumbs__divider--back"></div>
        <div className="breadcrumbs__crumb">
          <Link
            to={{
              pathname: backPath,
              search: state?.location?.search,
            }}
            state={state?.location?.state}
            className="breadcrumbs__link"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="page__container">
        <div className="page__category cart">
          <div className="cart__top">
            <h2 className="cart__title">Cart</h2>
          </div>
          {!!cart.length ? (
            <div className="cart__bottom">
              <div className="cart__list">
                {cart.map(item => (
                  <ProductCard item={item} key={item.id} />
                ))}
              </div>
              <div className="cart__summary">
                <div className="cart__price-wrapper">
                  <div className="cart__summary-price">{`$${totalSum}`}</div>
                  <div className="cart__summary-count">{`Total for ${totalCount} items`}</div>
                </div>
                <div className="cart__divider"></div>
                <button
                  type="button"
                  className="cart__checkout"
                  onClick={() => setPopup('Cart')}
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="page-not-found">
              <h3 className="page-not-found__title">Your cart is empty</h3>
              <img
                src="img/cart-is-empty.png"
                alt="empty cart"
                className="page-not-found__image"
              />
            </div>
          )}
        </div>
      </div>

      {!!popup.length && <Popup property={popup} />}
    </>
  );
};
