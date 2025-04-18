import React, { useState } from 'react';
import styles from './CartPage.module.scss';
import { useGlobalState } from '../../shared/constants/GlobalContext';
import { Product } from '../../shared/types/Product';
import classNames from 'classnames';
import { CheckoutModal } from './components/CheckoutModal';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const total = state.cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.amount,
    0,
  );
  const amount = state.cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product: Product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const removeAllFromCart = (product: Product) => {
    dispatch({ type: 'REMOVE_ALL_FROM_CART', payload: product });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearCart = () => {
    setIsModalOpen(false);
    state.cart = [];
  };

  return (
    <div className={styles.CartPage}>
      {state.cart.length !== 0 && (
        <div className={styles.CartPage__body}>
          <h2 className={styles.CartPage__title}>Cart</h2>

          <div className={styles.CartPage__content}>
            {state.cart.map(product => (
              <div key={product.name} className={styles.CartPage__card}>
                <div className={styles.CartPage__cardTop}>
                  <button
                    onClick={() => removeAllFromCart(product)}
                    className={styles.CartPage__cardClose}
                  ></button>
                  <img
                    className={styles.CartPage__cardImg}
                    src={product.image}
                    alt=""
                  />
                  <p className={styles.CartPage__cardTxt}>{product.name}</p>
                </div>

                <div className={styles.CartPage__cardBottom}>
                  <div className={styles.CartPage__cardBottomWrapper}>
                    <button
                      onClick={() =>
                        state.cart.find(
                          cart =>
                            cart.amount > 1 && cart.itemId === product.itemId,
                        ) && removeFromCart(product)
                      }
                      className={classNames(
                        styles.CartPage__cardBottomMinus,
                        state.cart.find(
                          cart =>
                            cart.amount > 1 && cart.itemId === product.itemId,
                        ) && styles.CartPage__cardBottomMinusEnabled,
                      )}
                    ></button>
                    <p className={styles.CartPage__cardBottomAmount}>
                      {
                        state.cart.find(cart => cart.itemId === product.itemId)
                          ?.amount
                      }
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className={styles.CartPage__cardBottomPlus}
                    ></button>
                  </div>

                  <p
                    className={styles.CartPage__cardBottomPrice}
                  >{`$${product.price}`}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.CartPage__bottom}>
            <div className={styles.CartPage__bottomWrapper}>
              <h2 className={styles.CartPage__bottomTotal}>{`$${total}`}</h2>
              <p className={styles.CartPage__bottomTxt}>
                Total for {amount} {amount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className={styles.CartPage__underline}></div>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.CartPage__Checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {state.cart.length === 0 && (
        <div className={styles.CartPage__body}>
          {' '}
          <h2 className={styles.CartPage__title}>Your cart is empty!</h2>
        </div>
      )}

      {isModalOpen && (
        <CheckoutModal onClose={setIsModalOpen} onClearCart={handleClearCart} />
      )}
    </div>
  );
};
