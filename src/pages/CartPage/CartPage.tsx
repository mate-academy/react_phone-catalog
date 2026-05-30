import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { VectorBreadCrumbs } from '../../components/VectorBreadCrumbs';
import { NavLink } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, delta: number) => {
    const item = state.items.find(items => items.id === id);

    if (!item) {
      return;
    }

    const newQuantity = item.quantity + delta;

    if (newQuantity > 0) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: newQuantity },
      });
    }
  };

  const handleIncrease = (id: number) => updateQuantity(id, 1);
  const handleDecrease = (id: number) => updateQuantity(id, -1);

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const totalQuantity = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <VectorBreadCrumbs></VectorBreadCrumbs>
        <h1 className={styles.container__title}>Cart</h1>
      </div>

      <div className={styles.container__box}>
        {state.items.length > 0 ? (
          state.items.map(item => (
            <div className={styles.cart} key={item.id}>
              <div className={styles.cart__top}>
                <button
                  className={styles.button}
                  onClick={() => handleRemove(item.id)}
                >
                  x
                </button>
                <NavLink
                  to={`/${item.product.category}/${item.product.itemId}`}
                  className={styles.img}
                >
                  <img src={item.product.image} alt={item.product.name} />
                </NavLink>
                <NavLink
                  to={`/${item.product.category}/${item.product.itemId}`}
                  className={styles.name}
                >
                  {item.product.name}
                </NavLink>
              </div>
              <div className={styles.cart__bottom}>
                <div className={styles.controls}>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className={styles.input}>{item.quantity}</span>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                </div>
                <h3 className={styles.price}>
                  ${item.product.price * item.quantity}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className={styles.checkout}>
        <div className={styles.checkout__info}>
          <h2>${totalPrice}</h2>
          <p>Total for {totalQuantity} items</p>
        </div>
        <hr />
        <button
          className={styles.checkout__button}
          disabled={state.items.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
