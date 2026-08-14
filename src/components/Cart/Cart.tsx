import { useAppDispatch, useAppSelector } from '../../store';
import {
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalItems,
} from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalItems = useAppSelector(selectTotalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIncrease = (id: string, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrease = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      dispatch(clearCart());
    }
  };

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <img
          src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
          alt="Cart is empty"
          className={styles.cartEmpty_cartImage}
        />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart_cardList}>
        {items.map(item => (
          <div key={item.id} className={styles.cart_Card}>
            <div className={styles.cart_Card_info}>
              <button
                className={styles.cart_Card_info_close}
                onClick={() => handleRemove(item.id)}
                aria-label="Remove item"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <Link
                to={`/${item.category}/${item.id}`}
                className={styles.cart_Card_info_image}
              >
                <img
                  src={
                    item.image.startsWith('/')
                      ? `${import.meta.env.BASE_URL}${item.image.slice(1)}`
                      : `${import.meta.env.BASE_URL}${item.image}`
                  }
                  alt={item.name}
                />
              </Link>
              <Link
                to={`/${item.category}/${item.id}`}
                className={styles.cart_Card_info_name}
              >
                {item.name}
              </Link>
            </div>
            <div className={styles.cart_Card_controls}>
              <div className={styles.cart_Card_controls_buttons}>
                <button
                  onClick={() => handleDecrease(item.id, item.quantity)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className={styles.cart_Card_controls_quantity}>
                  {item.quantity}
                </div>
                <button
                  onClick={() => handleIncrease(item.id, item.quantity)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <h3>${item.price * item.quantity}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cart_checkout}>
        <div className={styles.cart_checkout_price}>
          <h2>${totalPrice}</h2>
          <span className="text_body gray">
            Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
        <hr />
        <button
          className={`black_button ${styles.checkout_button}`}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
