import styles from './ShoppingCartPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  getArrowLeftActiveIcon,
  getCloseIcon,
  getMinusIcon,
  getPlusIcon,
} from '../../utils/getIcons';

export const ShoppingCartPage: React.FC = () => {
  const { theme } = useTheme();
  const arrowLeftActiveIcon = getArrowLeftActiveIcon(theme);
  const closeIcon = getCloseIcon(theme);
  const minusIcon = getMinusIcon(theme);
  const plusIcon = getPlusIcon(theme);

  const navigate = useNavigate();

  const { cart, manageCartItems, countTotalPrice, removeFromCart, clearCart } =
    useAppContext();
  const allItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    const confirmClearingCart = window.confirm(
      'Checkout has not done yet. Do you want to clear the cart anyway?',
    );

    if (confirmClearingCart) {
      clearCart();
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.upperContainer}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <img src={arrowLeftActiveIcon} alt="arrowleftactive" />
          <p className={styles.backButtonText}>Back</p>
        </button>

        <h1 className={styles.pageTitle}>Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className={styles.mainContainerEmpty}>
          <h3>Your cart is empty.</h3>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.cartItemsContainer}>
            {cart.map(cartItem => (
              <div key={cartItem.product.id} className={styles.cartItem}>
                <div className={styles.cartItemWrapper}>
                  <button
                    className={styles.iconButtonClose}
                    onClick={() => removeFromCart(cartItem.product.itemId)}
                  >
                    <img src={closeIcon} alt="close" />
                  </button>

                  <Link to={`/products/${cartItem.product.itemId}`}>
                    <img
                      src={cartItem.product.image}
                      alt={cartItem.product.itemId}
                      className={styles.image}
                    />
                  </Link>

                  <h4 className={styles.cartItemName}>
                    {cartItem.product.name}
                  </h4>
                </div>

                <div className={styles.quantityPriceWrapper}>
                  <div className={styles.quantityWrapper}>
                    <button
                      className={styles.iconButton}
                      onClick={() =>
                        manageCartItems(cartItem.product.itemId, -1)
                      }
                      disabled={cartItem.quantity <= 1}
                    >
                      <img src={minusIcon} alt="minus" />
                    </button>

                    {cartItem.quantity}

                    <button
                      className={styles.iconButton}
                      onClick={() =>
                        manageCartItems(cartItem.product.itemId, 1)
                      }
                    >
                      <img src={plusIcon} alt="plus" />
                    </button>
                  </div>

                  <div className={styles.cartItemPrice}>
                    {`$${cartItem.product.price}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalPriceContainer}>
            <h2 className={styles.totalPrice}>${countTotalPrice()}</h2>
            <p
              className={styles.totalPriceInfo}
            >{`Total for ${allItems} item${allItems > 1 ? 's' : ''}`}</p>

            <div className={styles.divider}></div>

            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
