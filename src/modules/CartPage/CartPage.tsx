import styles from './CartPage.module.scss';
import ArrowLeft from '../../assets/Chevron (Arrow Left).svg?react';
import CloseIcon from '../../assets/Close.svg?react';
import MinusIcon from '../../assets/Minus.svg?react';
import PLusIcon from '../../assets/Plus.svg?react';
import cartNone from '/public/img/cart-is-empty.png';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../providers/context';
import { useState } from 'react';

export const CartPage = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cart, setCart, getCart, clearCart } = useApp();

  const deleteFromCart = (productId: number) => {
    const existingCarts = getCart();
    const existingindex = existingCarts.findIndex(item => item.id === productId);

    if (existingindex !== -1) {
      existingCarts.splice(existingindex, 1);
      setCart([...existingCarts]);
      localStorage.setItem('cart', JSON.stringify(existingCarts));
    }
  };

  const changeQuantity = (productId: number, action: '+' | '-') => {
    const existingCarts = getCart();
    const existingindex = existingCarts.findIndex(item => item.id === productId);

    if (existingindex !== -1) {
      if (action === '+') {
        existingCarts[existingindex].quantity += 1;
      } else {
        existingCarts[existingindex].quantity = Math.max(
          1,
          existingCarts[existingindex].quantity - 1,
        );
      }
      setCart([...existingCarts]);
      localStorage.setItem('cart', JSON.stringify(existingCarts));
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsModalOpen(true);
  };

  const handleConfirmOrder = () => {
    clearCart();
    setIsModalOpen(false);
    // Здесь мог бы быть редирект на страницу подтверждения заказа
  };

  const handleCancelOrder = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {cart.length > 0 ? (
        <>
          <div className={styles.cart__back} onClick={() => navigate(-1)}>
            <ArrowLeft />
            Back
          </div>
          <div className={styles.cart__title}>Cart</div>
          <div className={styles.cart__items}>
            {cart.map(item => (
              <div className={styles.cart__item} key={item.id}>
                <div className={styles.cart__photoAndTitle}>
                  <CloseIcon
                    className={styles.cart__close}
                    onClick={() => deleteFromCart(item.id)}
                  />
                  <img className={styles.cart__image} src={item.image} alt="" />
                  <div className={styles.cart__name}> {item.name}</div>
                </div>
                <div className={styles.cart__quantityAndPrice}>
                  <div className={styles.cart__quantity}>
                    <div
                      className={
                        item.quantity > 1
                          ? styles.cart__quantityBorder
                          : styles.cart__activeAndNotActive
                      }
                      onClick={() => changeQuantity(item.id, '-')}
                    >
                      <MinusIcon />
                    </div>
                    <div className={styles.cart__quantityNumber}> {item.quantity}</div>
                    <div
                      className={styles.cart__quantityBorder}
                      onClick={() => changeQuantity(item.id, '+')}
                    >
                      <PLusIcon />
                    </div>
                  </div>
                  <div className={styles.cart__price}>$ {item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cart__total}>
            <div className={styles.cart__totalPrice}>
              ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </div>
            <div className={styles.cart__totalCount}>
              Total for {cart.reduce((count, item) => count + item.quantity, 0)} items
            </div>
            <div className={styles.cart__divider}></div>
            <button className={styles.cart__button} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className={styles.cart__secondTitle}>
          Your cart is empty
          <img src={cartNone} alt="" />
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Placing an order</h3>
              <p className={styles.modalText}>
                Your order has not been completed. Would you like to clear your basket?
              </p>
              <div className={styles.modalButtons}>
                <button className={styles.modalButtonConfirm} onClick={handleConfirmOrder}>
                  Yes, clear
                </button>
                <button className={styles.modalButtonCancel} onClick={handleCancelOrder}>
                  No, leave
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
