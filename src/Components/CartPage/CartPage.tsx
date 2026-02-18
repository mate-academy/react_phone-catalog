import { useContext, useEffect, useMemo, useState } from 'react';
import { CartItem } from '../CartItem/CartItem';
import { CartProduct, ProductsContext } from '../context/ProductsContext';
import { ButtonBack } from '../ButtonBack';
import { Modal } from '../Modal';

import './CartPage.scss';

type Total = {
  totalPrice: number;
  totalItems: number;
};

const totalCalc = (
  prev: Total,
  { quantity, product: { price } }: CartProduct,
) => {
  const acc = prev;

  acc.totalPrice += price * quantity;
  acc.totalItems += quantity;

  return acc;
};

export const CartPage = () => {
  const { cartProducts, clearCart } = useContext(ProductsContext);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { totalPrice, totalItems } = useMemo(
    () => cartProducts.reduce(totalCalc, { totalPrice: 0, totalItems: 0 }),
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
    <div className="cart-page">
      <div className="cart-page__container">
        <ButtonBack />
        <h1 className="cart-page__title">Cart Page</h1>
        <div className="cart-page__content">
          <ul className="cart-page__list">
            {cartProducts.map(cartProduct => (
              <li className="cart-page__list--item" key={cartProduct.id}>
                <CartItem
                  cartProduct={cartProduct.product}
                  quantity={cartProduct.quantity}
                />
              </li>
            ))}
          </ul>
          {Boolean(cartProducts.length > 0) ? (
            <div className="cart-page__total">
              <p className="cart-page__total--price">{totalPrice}</p>
              <span className="cart-page__total--items">{`Total for ${totalItems} items`}</span>
              <button
                className="cart-page__total--button"
                onClick={() => setIsModalOpened(true)}
              >
                Checkout
              </button>
            </div>
          ) : (
            <div className="cart-page__empty">
              <img
                src="/img/cart-is-empty.png"
                alt="Cart is empty"
                className="cart-page__empty--img"
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
