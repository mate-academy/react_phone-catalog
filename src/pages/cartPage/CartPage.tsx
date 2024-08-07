import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { CartItem } from '../../components/cartItem/CartItem';
import { ModalDialog } from '../../components/modalDialog';
import './CartPage.scss';
import { scrollToTop } from '../../services/utils/scrollToTop';
import { getTotalCount } from '../../services/utils/getTotalCount';

export const CartPage: React.FC = () => {
  const { cart, modal, setModal } = useContext(ProductsContext);
  const { state } = useLocation();

  const backPath = state?.location?.pathname || `/`;

  const totalSum = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'auto';
  }, [modal]);

  return (
    <>
      <div className="page__container">
        <div className="breadcrumbs breadcrumbs--back">
          <div className="breadcrumbs__divider breadcrumbs__divider--back" />
          <div className="breadcrumbs__crumb">
            <Link
              to={{ pathname: backPath, search: state?.location?.search }}
              state={state?.location?.state}
              className="breadcrumbs__link"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="page__category cart">
          <div className="cart__top">
            <h2 className="cart__title">Cart</h2>
          </div>
          {cart.length > 0 ? (
            <div className="cart__bottom">
              <div className="cart__list">
                {cart.map(item => (
                  <CartItem item={item} key={item.id} />
                ))}
              </div>
              <div className="cart__summary">
                <div className="cart__price-wrapper">
                  <div className="cart__summary-price">{`$${totalSum}`}</div>
                  <div className="cart__summary-count">{`Total for ${getTotalCount(cart)} item${getTotalCount(cart) > 1 ? 's' : ''}`}</div>
                </div>
                <div className="cart__divider" />
                <button
                  type="button"
                  className="cart__checkout"
                  onClick={() => setModal('Cart')}
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

      {modal && <ModalDialog value={modal} />}
    </>
  );
};
