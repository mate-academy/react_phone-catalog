/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './CartList.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';

export const CartList = () => {
  const { cartItems, removeItemFromCart, updateQuantity } =
    useContext(StoreContext);

  const 

  const totalAmount = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.cartlist}>
        {cartItems.map(cartItem => (
          <div key={cartItem.id} className={styles.product}>
            <div className={styles.info}>
              <button
                className={styles.cross}
                onClick={() => {
                  removeItemFromCart(cartItem.product.id);
                }}
              >
                <img src="images/Union.svg" alt="Cross" />
              </button>
              <NavLink
                to={`/product/${cartItem.product.itemId}`}
                className={styles.link}
              >
                <div className={styles.image}>
                  <img
                    className={styles.photo}
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                  />
                </div>

                <span className={styles.name}>{cartItem.product.name}</span>
              </NavLink>
            </div>

            <div className={styles.actions}>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => {
                    updateQuantity(cartItem.product.id, cartItem.quantity - 1);
                  }}
                  disabled={cartItem.quantity === 1}
                >
                  <img className={styles.prev} src={"images/Minus.svg"} />
                </button>

                <span className={styles.name}>{cartItem.quantity}</span>

                <button
                  className={styles.button}
                  onClick={() => {
                    updateQuantity(cartItem.product.id, cartItem.quantity + 1);
                  }}
                  disabled={cartItem.quantity === 99}
                >
                  <img className={styles.next} src="images/Plus.svg" />
                </button>
              </div>
              <span
                className={styles.price}
              >{`$${cartItem.product.price}`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.checkout}>
        <div className={styles.summary}>
          <span className={styles.amount}>{`$${totalAmount}`}</span>
          <span className={styles.total}>
            Total for {totalQuantity} {cartItems.length > 1 ? 'items' : 'item'}
          </span>
        </div>
        <hr />
        <button
          className={styles.checkoutbutton}
          onClick={() => {
            const isConfirmed = window.confirm(
              'Checkout is not implemented yet. Do you want to clear the Cart?',
            );

            if (isConfirmed) {
              localStorage.removeItem('cart');
              window.location.reload();
            }
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
