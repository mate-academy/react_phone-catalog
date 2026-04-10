import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
export const CartPage = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleCheckout = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cart}>
      <button className={styles.cart__back} onClick={() => navigate(-1)}>
        <Icon name="left" />
        <span>Back</span>
      </button>
      <h1 className={styles.cart__title}>Cart</h1>
      {cart.length > 0 ? (
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cart.map(item => (
              <div key={item.id} className={styles.item}>
                <button
                  className={styles.item__remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  <Icon name="closeCart" />
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.item__img}
                />
                <p className={styles.item__name}>{item.name}</p>
                <div className={styles.item__quantity}>
                  <button
                    className={styles.item__btn}
                    onClick={() => changeQuantity(item.id, 'minus')}
                  >
                    -
                  </button>
                  <span className={styles.item__count}>{item.quantity}</span>
                  <button
                    className={styles.item__btn}
                    onClick={() => changeQuantity(item.id, 'plus')}
                  >
                    +
                  </button>
                </div>
                <p className={styles.item__price}>
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <div className={styles.total__price}>${totalPrice}</div>
            <p className={styles.total__count}>Total for {totalItems} items</p>
            <div className={styles.total__line}></div>
            <button className={styles.total__checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.cart__empty}>
          <h2>Your cart is empty</h2>
        </div>
      )}
    </div>
  );
};
