/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';
import './Cart.scss';
import { Loader } from '../../components/Loader';

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const newCartProducts: CartItem[] = [];

  useEffect(() => {
    setIsLoading(true);
    const cartItems = localStorage.getItem('products');

    if (cartItems !== null) {
      const products = JSON.parse(cartItems);

      setCartProducts(products);
    }

    if (cartItems === null) {
      setNoItems(true);
    }

    setIsLoading(false);
  }, []);

  const productType = (product: Product) => {
    if (product.type === 'accessory') {
      return 'accessories';
    }

    return `${product.type}s`;
  };

  const handleCount = (productId: string, sign: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id === productId) {
        switch (sign) {
          case '+':
            copy.quantity = currentProduct.quantity + 1;
            break;
          case '-':
            copy.quantity = currentProduct.quantity - 1;
            break;
          default:
            break;
        }
      }

      newCartProducts.push(copy);
    });

    localStorage.setItem('products', JSON.stringify(newCartProducts));
    setCartProducts(newCartProducts);
  };

  const removeItem = (productId: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id !== productId) {
        newCartProducts.push(copy);
      }
    });

    if (newCartProducts.length === 0) {
      localStorage.removeItem('products');
      setNoItems(true);
    } else {
      localStorage.setItem('products', JSON.stringify(newCartProducts));
      setCartProducts(newCartProducts);
      setNoItems(false);
    }
  };

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((accum, next) => {
      return next.quantity * next.product.price + accum;
    }, 0);
  }, [cartProducts]);

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
        <h1 className="page__sectionTitle Cart__title">Cart</h1>
        {!isLoading && !noItems && (
          <div className="Cart__content grid">
            <div className="Cart__items grid__item--1-16">
              {cartProducts.map(item => (
                <div
                  className="Cart__item"
                  key={item.id}
                >
                  <div className="Cart__description">
                    <i
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
                    <div className="Cart__quantity">
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
                      <p className="Cart__itemQuantity">
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
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {!isLoading && noItems && (
          <h2>You cart is Empty</h2>
        )}
      </section>
    </>
  );
};
