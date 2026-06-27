import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import styles from './CartList.module.scss';
import { useTranslation } from 'react-i18next';

export const CartItem = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { t } = useTranslation();

  const handleAddItem = (itemId: string) => {
    const findItemId = cart.find(item => item.product.id === itemId);
    const currentQuantity = findItemId ? findItemId.quantity : 0;
    const quantity = currentQuantity + 1;

    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.product.id === itemId);

    if (item && item.quantity <= 1) {
      removeFromCart(itemId);
    } else if (item) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    const isConfirmed = window.confirm(t('cart.confirmCheckout'));

    if (isConfirmed === true) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorMessage}>{t('cart.empty')}</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartContainer}>
        <div className={styles.cartList}>
          {cart.map(product => (
            <div key={product.product.id} className={styles.itemWrapper}>
              <div className={styles.itemDelete}>
                <button
                  onClick={() => removeFromCart(product.product.id)}
                  className={styles.deleteButton}
                  aria-label={t('cart.deleteItemAlt')}
                >
                  <div className={styles.closeButton}>
                    <img
                      src="./img/icons/close.svg"
                      alt={t('cart.deleteItemAlt')}
                      className={styles.closeButtonImage}
                    />
                  </div>
                </button>
              </div>

              <Link
                to={`/${product.product.category}/product/${product.product.itemId || product.product.id}`}
                className={styles.itemImageWrapper}
              >
                <img
                  src={product.product.image}
                  alt={product.product.name}
                  className={styles.itemImage}
                />
              </Link>

              <h2 className={styles.itemName}>{product.product.name}</h2>

              <div className={styles.itemQuantity}>
                <button
                  onClick={() => handleRemoveItem(product.product.id)}
                  className={styles.quantityButton}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className={styles.quantityValue}>{product.quantity}</span>
                <button
                  onClick={() => handleAddItem(product.product.id)}
                  className={styles.quantityButton}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div>
                <h3 className={styles.itemPrice}>${product.product.price}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryPrice}>${totalPrice}</h2>
          <p className={styles.summaryInfo}>
            {t('cart.totalFor', { count: totalItems })}
          </p>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            {t('cart.checkout')}
          </button>
        </div>
      </div>
    </div>
  );
};
