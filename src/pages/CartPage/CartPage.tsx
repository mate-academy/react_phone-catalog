import { useMemo, useState } from 'react';
import { useGlobalState } from '../../hooks/hooks';
import { CartProductCard } from '../../components/CartProductCard';
import { BackNav } from '../../components/BackNav';
import { Modal } from '../../components/Modal';
import './CartPage.scss';
import '../../styles/container.scss';

export const CartPage = () => {
  const { cart } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = useMemo(() => {
    return cart.reduce((sum, product) => product.quantity + sum, 0);
  }, [cart]);

  const amount = useMemo(() => {
    return cart.reduce(
      (sum, product) => product.quantity * product.price + sum,
      0,
    );
  }, [cart]);

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__content">
          <div className="cart__nav">
            <BackNav />
          </div>
          <h2 className="cart__title">Cart</h2>

          {cart.length === 0 ? (
            <div className="">
              <p>Your cart is empty...</p>
              <img
                className="cart__empty"
                src="./img/cart-is-empty.png"
                alt="Cart is empty"
              />
            </div>
          ) : (
            <div className="cart__wrapper">
              <ul className="cart__list">
                {cart.map(product => (
                  <li className="cart__item" key={product.itemId}>
                    <CartProductCard product={product} />
                  </li>
                ))}
              </ul>
              <div className="cart__total">
                <p className="cart__amount">{`$${amount}`}</p>

                {total === 1 ? (
                  <p className="cart__text">Total for 1 item</p>
                ) : (
                  <p className="cart__text">{`Total for ${total} items`}</p>
                )}

                <hr className="cart__line" />
                <button
                  type="button"
                  className="cart__button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && <Modal onCloseModal={() => setIsModalOpen(false)} />}
    </div>
  );
};
