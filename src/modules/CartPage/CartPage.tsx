import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { CartItem } from './components/CartItem';
import { CartItem as cartItem } from '../../types/CartItem';
import { useState } from 'react';
import { Modal } from './components/Modal';

export const CartPage = () => {
  const { items, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalAmount = (products: cartItem[]) => {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      const sum = products[i].product.price * products[i].quantity;

      total += sum;
    }

    return total;
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cart}>
      <button onClick={() => navigate(-1)} className={styles.cart__back}>
        <span className={styles.cart__back_icon}></span>
        <span className={styles.cart__back_text}>Back</span>
      </button>

      <h1 className={styles.cart__title}>Cart</h1>

      {!items.length && (
        <h4 className={styles.cart__empty}>Your cart is empty</h4>
      )}

      <div className={styles.cart__items}>
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {items.length > 0 && (
        <div className={styles.cart__bottom}>
          <div className={styles.cart__total}>
            <span
              className={styles.cart__total_amount}
            >{`$${calculateTotalAmount(items)}`}</span>
            <span
              className={styles.cart__total_text}
            >{`Total for ${getTotalItems()} items`}</span>
          </div>

          <div className={styles.cart__divider}></div>

          <button
            type="button"
            className={styles.cart__checkout}
            onClick={() => setIsModalOpen(true)}
          >
            Checkout
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.overlay}>
          <Modal onClose={handleClose} />
        </div>
      )}
    </div>
  );
};
