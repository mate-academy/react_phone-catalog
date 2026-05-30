import React, { useContext, useEffect, useMemo, useState } from 'react';
import './CartPage.scss';
import { BackButton } from '../ButtonBack';
import { CartItem } from '../CartItem';
import { CartProduct, ProductsContext } from '../context/ProductsContext';
import { Modal } from '../Modal/Modal';

type Total = {
  totalSum: number;
  totalItems: number;
};
const totalCalc = (
  prev: Total,
  { quantity, product: { price } }: CartProduct,
) => {
  const acc = prev;

  acc.totalSum += price * quantity;
  acc.totalItems += quantity;

  return acc;
};

export const CartPage = () => {
  const { cartProducts, clearCart } = useContext(ProductsContext);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { totalSum, totalItems } = useMemo(
    () => cartProducts.reduce(totalCalc, { totalSum: 0, totalItems: 0 }),
    [cartProducts],
  );

  const handleClearCart = () => {
    clearCart();
    setIsModalOpened(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="cart">
      <div className="container container--with-paddings">
        <BackButton />
        <h1 className="cart__title">Cart</h1>
        <div className="cart__content">
          <ul className="cart__list">
            {cartProducts.map(cartProduct => (
              <li className="cart__list__item" key={cartProduct.id}>
                <CartItem
                  cartProduct={cartProduct.product}
                  quantity={cartProduct.quantity}
                />
              </li>
            ))}
          </ul>
          {Boolean(cartProducts.length) ? (
            <div className="cart__total">
              <p className="cart__total__count">{`$ ${totalSum}`}</p>
              <span className="cart__total__count-of-items">
                {`Total for ${totalItems} items`}
              </span>
              <button
                className="cart__total__button"
                onClick={() => setIsModalOpened(true)}
              >
                Checkout
              </button>
            </div>
          ) : (
            <div className="cart__empty">
              <img
                src="./img/cart-is-empty.png"
                alt="your cart is empty"
                className="cart__empty__img"
              />
            </div>
          )}
        </div>
      </div>

      {isModalOpened && (
        <Modal
          onClose={() => setIsModalOpened(false)}
          onClearCart={handleClearCart}
        />
      )}
    </div>
  );
};
