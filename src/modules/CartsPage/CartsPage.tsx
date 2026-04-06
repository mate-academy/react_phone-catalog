import { useNavigate } from 'react-router-dom';
import styles from './CartsPage.module.scss';
import { CartItem } from './components/CartItem';
import { useShop } from '../../store/ShopContext';

export const CartsPage = () => {
  const navigate = useNavigate();
  const { carts, clearCart } = useShop();
  const isEmpty = carts.length === 0;
  const totalQuantity = carts.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalPrice = carts.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const isConfirm = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirm) {
      clearCart();
    }
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.back}>
          <img
            src="/img/icon/chevron-arrow-left.svg"
            alt="Arrow Left"
            className={styles.backIcon}
          />
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <h1 className={styles.title}>Cart</h1>

        {isEmpty ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.list}>
              {carts.map(cart => (
                <CartItem key={cart.id} cart={cart} />
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryContent}>
                <p className={styles.summaryPrice}>{`$${totalPrice}`}</p>
                <p className={styles.summaryText}>
                  {`Total for ${totalQuantity} items`}
                </p>
              </div>
              <div className={styles.summaryAction}>
                <button
                  type="button"
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
