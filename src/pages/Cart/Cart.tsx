/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { Product } from '../../types/Product';
import './Cart.scss';
import { Loader } from '../../components/Loader';
import { CartContext } from '../../components/CartContext/CartContext';

export const Cart = () => {
  const {
    cartProducts,
    removeItem,
    handleCount,
    totalPrice,
    setCartProducts,
  } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isNotification, setNotification] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const cartItems = localStorage.getItem('products');

    if (cartItems !== null) {
      const products = JSON.parse(cartItems);

      setCartProducts(products);
    }

    setIsLoading(false);
  }, []);

  const productType = (product: Product) => {
    if (product.type === 'accessory') {
      return 'accessories';
    }

    return `${product.type}s`;
  };

  const handleCheckout = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 2000);
  };

  return (
    <>
      {isLoading && (
        <div className="page__notification">
          <Loader />
        </div>
      )}
      <section className="Cart">
        <div className="Cart__backBtn">
          <BackButton />
        </div>
        {!isLoading && cartProducts.length > 0 && (
          <>
            <h1 className="page__sectionTitle Cart__title">Cart</h1>
            <div className="Cart__content grid">
              <div className="Cart__items grid__item--1-16">
                {cartProducts.map(item => (
                  <div
                    className="Cart__item"
                    key={item.id}
                  >
                    <div className="Cart__description">
                      <i
                        data-cy="cartDeleteButton"
                        className="icon icon--close Cart__close"
                        onClick={() => removeItem(item.id)}
                      />
                      <div
                        className={classNames(
                          'Cart__photoContainer',
                        )}
                      >
                        <img
                          src={`https://mate-academy.github.io/react_phone-catalog/${item.product.imageUrl}`}
                          alt={item.id}
                          className="Cart__img"
                        />
                      </div>
                      <Link
                        className="Cart__itemName"
                        to={`/${productType(item.product)}/${item.id}`}
                        target="_blank"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <div className="Cart__priceAndQuantity">
                      <div
                        className="Cart__quantity"
                      >
                        <button
                          type="button"
                          className="
                            arrowButton
                            arrowButton--minus
                            button
                          "
                          onClick={() => handleCount(item.id, '-')}
                          disabled={item.quantity === 1}
                        >
                          &nbsp;
                        </button>
                        <p
                          className="Cart__itemQuantity"
                          data-cy="productQauntity"
                        >
                          {item.quantity}
                        </p>
                        <button
                          type="button"
                          className="
                            arrowButton
                            button
                            arrowButton--plus
                          "
                          onClick={() => handleCount(item.id, '+')}
                        >
                          &nbsp;
                        </button>
                      </div>
                      <div className="Cart__price">
                        {`$${item.product.price * item.quantity}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="Cart__checkout grid__item--17-24">
                <p className="Cart__checkoutPrice">{totalPrice}</p>
                <p className="Cart__countItems">{`Total for ${cartProducts.length} items`}</p>
                <div className="Cart__line" />
                <button
                  type="button"
                  className="Cart__button addToCartButtons__buy"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}

        {isNotification && (
          <div className="page__notification Cart__notification">
            We are sorry, but this feature is not implemented yet
          </div>
        )}

        {!isLoading && cartProducts.length === 0 && (
          <h2>You cart is Empty</h2>
        )}
      </section>
    </>
  );
};
