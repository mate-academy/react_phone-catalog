import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet.\nDo you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cartPage}>
        {/* BACK */}
        <div className={styles.backBtn} onClick={() => navigate(-1)}>
          <div className={styles.backBtn__icon} />
          <p className={styles.backBtn__text}>Back</p>
        </div>

        <h1 className={styles.title}>Cart</h1>

        {cart.length === 0 && (
          <p className={styles.favoritesEmpty}>There is nothing here now</p>
        )}

        {cart.length > 0 && (
          <div className={styles.content}>
            {/* LIST */}
            <div className={styles.content__list}>
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className={styles.content__list__cartItem}
                >
                  {/* TOP */}
                  <div className={styles.content__list__cartItemTop}>
                    <button
                      type="button"
                      className={styles.content__list__cartItemTop__remove}
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.product.id)}
                    />

                    <div
                      className={
                        styles.content__list__cartItemTop__imageContainer
                      }
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className={
                          styles.content__list__cartItemTop__imageContainer__im
                        }
                      />
                    </div>

                    <p className={styles.name}>{item.product.name}</p>
                  </div>

                  {/* BOTTOM */}
                  <div className={styles.content__list__cartItemBottom}>
                    <div
                      className={
                        styles.content__list__cartItemBottom__quantityWrapper
                      }
                    >
                      <button
                        type="button"
                        className={`${styles.content__list__cartItemBottom__qtyButton} ${
                          item.quantity === 1 ? styles.qtyButtonDisabled : ''
                        }`}
                        disabled={item.quantity === 1}
                        onClick={() => decreaseQuantity(item.product.id)}
                      >
                        –
                      </button>

                      <span
                        className={
                          styles.content__list__cartItemBottom__quantity
                        }
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className={
                          styles.content__list__cartItemBottom__qtyButton
                        }
                        onClick={() => increaseQuantity(item.product.id)}
                      >
                        +
                      </button>
                    </div>

                    <p className={styles.content__list__cartItemBottom__price}>
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className={styles.content__summary}>
              <div className={styles.content__summary__summaryInfo}>
                <h2
                  className={styles.content__summary__summaryInfo__totalPrice}
                >
                  ${totalPrice}
                </h2>

                <p className={styles.content__summary__summaryInfo__totalCount}>
                  Total for {totalCount} items
                </p>
              </div>

              <div className={styles.content__summary__divider} />

              <button
                className={styles.content__summary__checkoutBtn}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
