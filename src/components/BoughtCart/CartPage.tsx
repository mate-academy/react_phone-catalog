import { useState } from 'react';
import styles from './CartPage.module.scss';
import { useInfoHook } from '../ProductInfo/useInfoHook';
import { useCart } from './CartContext';
import back from '../../assets/icons/arrowLeftL.svg';
import backLight from '../../assets/icons/arrowLeftLight.svg';
import empty from '../../../public/img/cart-is-empty.png';
import { BoughtCardItem } from '../BoughtCardItem/BoughtCardItem';
import { CheckoutChears } from '../Reward/Reward';
import { useTheme } from '../Themes';

export const CartPage = () => {
  const { navigate } = useInfoHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);
  const { theme } = useTheme();
  const isBasicDark = theme === 'dark';

  const totalCartPrice = cart.reduce((acc, item) => {
    const itemPrice = item.fullPrice * (item.quantity || 1);

    return acc + itemPrice;
  }, 0);

  const totalCartItem = cart.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    localStorage.removeItem('cart');
    setIsModalOpen(false);
    clearCart();
    setIsCheckoutConfirmed(true);
    setTimeout(() => {
      setIsCheckoutConfirmed(false);
    }, 5000);
  };

  return (
    <main className={styles.main__phonepage}>
      <h1 className={styles.title}>
        <div className={styles.productInfolink}>
          <img
            src={isBasicDark ? back : backLight}
            alt="back"
            onClick={() => navigate(-1)}
            className={styles.productInfolink__backImg}
          />
          <p
            className={styles.productInfolink__backTitle}
            onClick={() => navigate(-1)}
          >
            Back
          </p>
        </div>
      </h1>
      <h1 className={styles.page__title}>Cart</h1>
      {cart.length > 0 ? (
        <div className={styles.cart__wrapper}>
          <div className={styles['cart__wrapper--left']}>
            {cart.map(product => (
              <BoughtCardItem
                key={product.id}
                product={product}
                onDelete={removeFromCart}
                onUpdate={updateQuantity}
              />
            ))}
          </div>
          <div className={styles['cart__wrapper--right']}>
            <h1 className={styles.window__price}>{`$${totalCartPrice}`}</h1>
            <p
              className={styles.window__title}
            >{`Total for ${totalCartItem} items`}</p>
            <div className={styles.product__row}></div>
            <button className={styles.checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="none">
          <img
            src={empty}
            alt="Your cart is empty"
            className="product__empty"
          />
        </div>
      )}
      {isModalOpen && (
        <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
          <div
            className={styles.modal__content}
            onClick={e => e.stopPropagation()}
          >
            <h2 className={styles.modal__title}>Do you want to buy this?</h2>
            <p className={styles.modal__price}>{`Total: $${totalCartPrice}`}</p>
            <div className={styles.modalbtn__wrapper}>
              <button className={styles.confirm} onClick={confirmCheckout}>
                Confirm
              </button>
              <button
                className={styles.cancel}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isCheckoutConfirmed && <CheckoutChears trigger={isCheckoutConfirmed} />}
    </main>
  );
};
