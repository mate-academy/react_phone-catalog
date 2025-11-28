import { CartProduct } from './components/CartProduct';
import { useCart } from '../../contexts/CartContext';

import styles from './CartPage.module.scss';
import emptyCart from '/img/cart-is-empty.png';
import { BackBtn } from '../../components/BackBtn';

export const CartPage = () => {
  const { cart, totalAmount, totalQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clearCart();
    }
  };

  return (
    <>
      <div className={styles.cart}>
        <BackBtn />
        <h1 className={styles.cart_header}>Cart</h1>

        <div className={styles.cart_content}>
          <div className={styles.cart_list}>
            {cart.length === 0 ? (
              <div className={styles.cart_empty_content}>
                <h3 className={styles.cart_empty_title}>Your cart is empty</h3>
                <img
                  src={emptyCart}
                  alt="empty cart"
                  className={styles.cart_empty_img}
                />
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <CartProduct key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
          {cart.length > 0 && (
            <div className={styles.cart_checkout}>
              <div className={styles.cart_checkout_info}>
                <div className={styles.cart_checkout_total_amout}>
                  ${totalAmount}
                </div>
                <div className={styles.cart_checkout_total_items}>
                  Total for {totalQuantity}{' '}
                  {totalQuantity === 1 ? 'item' : 'items'}
                </div>
                <div className={styles.cart_checkout_divine_line}></div>
              </div>
              <button
                className={styles.cart_checkout_btn}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
