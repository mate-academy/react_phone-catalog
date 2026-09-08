import { Link } from 'react-router-dom';
import { useCart } from '../../../../store/CartContext';
import styles from './CartContent.module.scss';

export const CartContent = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <>
      {cart.map(item => (
        <div key={item.product.id} className={styles.cart__item}>
          <div className={styles.cart__items_container}>
            <div
              className={styles.cart__remove_btn}
              onClick={() => removeFromCart(item.product.id)}
            >
              X
            </div>
            <div className={styles.cart__image_container}>
              <Link to={`/${item.product.category}/${item.product.itemId}`}>
                <img
                  className={styles.cart__image}
                  src={item.product.image}
                  alt={item.product.name}
                />
              </Link>
            </div>
            <div className={styles.cart__item_name}>{item.product.name}</div>
          </div>
          <div
            className={`${styles.cart__items_container} ${styles[`cart__items_container--2`]}`}
          >
            <div className={styles.cart__qnty_container}>
              <div
                className={styles.cart__btn_container}
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
              >
                -
              </div>
              <div className={styles.cart__qnty_container}>{item.quantity}</div>
              <div
                className={styles.cart__btn_container}
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
              >
                +
              </div>
            </div>
            <div className={styles.cart__item_price}>
              ${item.product.price * item.quantity}
            </div>
          </div>
        </div>
      ))}
      <div className={styles.cart__checkout}>
        <div className={styles.cart__checkout_amnt}>
          ${totalAmount.toFixed(2)}
          <div
            className={styles.cart__checkout_amnt_text}
          >{`Total for ${totalQuantity} items`}</div>
        </div>

        <button className={styles.cart__checkout_btn} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
};
