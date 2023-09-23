import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Cart.scss';

import { ReactComponent as Cross } from '../../images/icons/close.svg';
import { ReactComponent as Plus } from '../../images/icons/plus.svg';
import { ReactComponent as Minus } from '../../images/icons/minus.svg';
import { BackLink } from '../../components/BackLink/BackLink';
import { ShopContext } from '../../ShopContext';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, changeValueInCart } = useContext(ShopContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const visibleProducts = useMemo(() => (
    cart.sort((a, b) => +a.id - +b.id)
  ), [cart]);

  const totalPrice = useMemo(() => (
    cart.map(p => p.price * (p.count || 1)).reduce((sum, p) => sum + p, 0)
  ), [cart]);

  const totalItems = useMemo(() => (
    cart.map(p => (p.count || 1)).reduce((sum, p) => sum + p, 0)
  ), [cart]);

  const totalText = totalItems > 1 ? 'items' : 'item';
  const isCartEmpty = cart.length <= 0;

  const handleCheckoutClick = () => {
    setIsCheckout(true);

    setTimeout(() => setIsCheckout(false), 5000);
  };

  return (
    <section className="cart">
      <div className="cart__back-link">
        <BackLink />
      </div>
      <h1 className="cart__title title">Cart</h1>
      {isCartEmpty && (
        <>
          <div className="cart__empty empty__message">
            Your cart is empty. Please select items to fill it...
          </div>
          <Link className="cart__empty-link empty__link" to="../">
            Go to HomePage
          </Link>
        </>
      )}
      {!isCartEmpty && (
        <div className="cart__content">
          <TransitionGroup className="cart__products">
            {visibleProducts.map(product => {
              const count = product.count ? product.count : 1;
              const isMinusDisabled = count <= 1;

              return (
                <CSSTransition
                  key={product.id}
                  timeout={300}
                  classNames="cart__product-transition"
                  enter={false}
                >
                  <div className="cart__product">
                    <button
                      type="button"
                      data-cy="cartDeleteButton"
                      className="cart__product-cross"
                      onClick={() => (removeFromCart(product.phoneId))}
                    >
                      <Cross />
                    </button>
                    <div className="cart__product-image">
                      <img
                        className="cart__product-img"
                        src={`./_new/${product.image}`}
                        alt={`${product.name} thumbnail`}
                      />
                    </div>
                    <div className="cart__product-name">
                      {product.name}
                    </div>
                    <div className="cart__product-counter">
                      <button
                        disabled={isMinusDisabled}
                        className="cart__product-button button button__nav"
                        type="button"
                        onClick={
                          () => (changeValueInCart('-', product.phoneId))
                        }
                      >
                        <Minus />
                      </button>
                      <span className="cart__product-count">
                        {product.count || 1}
                      </span>
                      <button
                        className="cart__product-button button button__nav"
                        type="button"
                        onClick={
                          () => (changeValueInCart('+', product.phoneId))
                        }
                      >
                        <Plus />
                      </button>
                    </div>
                    <div className="cart__product-price">{`$${product.price * count}`}</div>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <div className="cart__total" data-cy="productQauntity">
            <span className="cart__total-price">{`$${totalPrice}`}</span>
            <span className="cart__total-items">{`Total for ${totalItems} ${totalText}`}</span>
            <button
              className="cart__checkout button button--primary"
              type="button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
            {isCheckout && (
              <div className="cart__notification notification__error">
                We are sorry, but this feature is not implemented yet
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
