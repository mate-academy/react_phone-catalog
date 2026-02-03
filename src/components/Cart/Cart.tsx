import { useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';

const Cart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIncrease = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrease = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (!mounted) {
    return null;
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <img src="/img/cart-is-empty.png" alt="Cart is empty" />
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
                <img src="/img/icons/XMark(gray).svg" alt="Remove" />
              </button>
              <Link
                to={`/${item.category}/${item.id}`}
                className={styles.cart_Card_info_image}
              >
                <img src={`/${item.image}`} alt={item.name} />
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
        <button className="black_button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
