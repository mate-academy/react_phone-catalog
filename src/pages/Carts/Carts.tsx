import React, { useContext, useEffect, useState } from 'react';
import { Cart, LocalStorageContext } from '../../context/LocaleStorageContext';
import { ApiContext } from '../../context/ApiContext';
import { ProductType } from '../../types/ProductType';
import cn from 'classnames';

import './carts.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

type Tagret = 'price' | 'amount';

export const Carts: React.FC = () => {
  const { carts, removeFromCart, updateCart } = useContext(LocalStorageContext);

  const location = useLocation();
  const from = location.state?.from;
  const nav = useNavigate();

  const productsAll = useContext(ApiContext) as ProductType[];

  const findCarts = productsAll.filter(product =>
    carts.some(cart => cart.id === product.itemId),
  );

  const [data, setData] = useState<Cart[]>();

  const countTotal = (target: Tagret): number => {
    let total = 0;

    if (data) {
      if (target === 'price') {
        total = data.reduce((acc, val) => {
          return acc + val.price * val.amount;
        }, 0);
      } else {
        total = data.reduce((acc, val) => {
          return acc + val.amount;
        }, 0);
      }
    }

    return total;
  };

  const navBack = () => {
    nav(from ? from : '/');
  };

  useEffect(() => {
    setData(carts);
  }, [carts]);

  return (
    <div className="container">
      <button
        onClick={navBack}
        className="common-navigation common-navigation--margin"
      ></button>

      {carts.length === 0 ? (
        <>
          <h1 className="productDetails-title"> Cart is empty</h1>
          <span className="carts-empty-box"></span>
        </>
      ) : (
        <>
          <h1 className="title">Cart</h1>
          <section className="carts-box">
            <ul className="carts-box__list">
              {findCarts.length > 0 &&
                data &&
                findCarts.map(item => {
                  const PRODUCT = item.itemId ? item.itemId : 'Not find';
                  const PRICE = item.price ? item.price : 0;

                  const currentCart = data.find(
                    cart => cart.id === item.itemId,
                  );

                  const handleChange = (action: 'minus' | 'plus') => {
                    let newCount;

                    if (action === 'plus') {
                      newCount = currentCart ? currentCart.amount + 1 : 1;
                    } else {
                      newCount =
                        currentCart && currentCart.amount > 1
                          ? currentCart.amount - 1
                          : 1;
                    }

                    updateCart(item.itemId, newCount);
                  };

                  return (
                    <li key={item.id} className="cart">
                      <div className="cart-product-char">
                        <button
                          onClick={() => removeFromCart(PRODUCT)}
                          className="cart-product-char__delete-button"
                        >
                          <img
                            src="./img/icons/delete-button.svg"
                            alt="deleteFromCarts"
                          />
                        </button>

                        <div className="cart-product-char__info">
                          <img
                            className="cart-product-char__model-img"
                            src={item.image}
                            alt="model img"
                          />

                          <NavLink
                            className="cart-product-char__model-name"
                            to={`/${item.category}/product/:${item.itemId}`}
                          >
                            <span className="product-card__title">
                              {item.name}
                            </span>
                          </NavLink>
                        </div>
                      </div>

                      {currentCart && (
                        <div className="cart__amount-and-price">
                          <div className="cart__amount">
                            <button
                              onClick={() => handleChange('minus')}
                              className={cn('cart__select-amount-button', {
                                'cart__select-amount-button--stop':
                                  currentCart.amount === 1,
                              })}
                            >
                              <img
                                className="cart__button-img"
                                src="./img/icons/button-minus.svg"
                                alt=""
                              />
                            </button>
                            <span className="cart__product-amount">
                              {currentCart.amount}
                            </span>

                            <button
                              onClick={() => handleChange('plus')}
                              className="cart__select-amount-button"
                            >
                              <img
                                className="cart__button-img"
                                src="./img/icons/button-plus.svg"
                                alt=""
                              />
                            </button>
                          </div>
                          <span className="cart_price">
                            ${PRICE * currentCart.amount}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>

            <div className="carts-box-checkout">
              <div className="carts-box-checkout__common-price">
                {countTotal('price')}
              </div>
              <span className="carts-box-checkout__amount-products">
                Total for {countTotal('amount')}
              </span>
              <button className="carts-box-checkout-apply">Checkout</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
