import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BackButton } from '../../components/BackButton';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    items,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className="container">
      <BackButton />

      <h1 className="page__title">Cart</h1>

      {items.length === 0 ? (
        <p className={styles.cart__empty}>Your cart is empty</p>
      ) : (
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.cart__item}>
                <div className={styles.cart__itemTop}>
                  <button
                    type="button"
                    className={styles.cart__remove}
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove"
                    data-cy="cartDeleteButton"
                  >
                    <img src="img/icons/remove.svg" alt="Remove" />
                  </button>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.cart__imageLink}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.cart__image}
                    />
                  </Link>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.cart__name}
                  >
                    {product.name}
                  </Link>
                </div>

                <div className={styles.cart__itemBottom}>
                  <div className={styles.cart__counter}>
                    <button
                      type="button"
                      className={classNames(styles.cart__counterBtn, {
                        [styles['cart__counterBtn--disabled']]: quantity <= 1,
                      })}
                      disabled={quantity <= 1}
                      onClick={() => decrement(product.id)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span
                      className={styles.cart__quantity}
                      data-cy="productQa498"
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      className={styles.cart__counterBtn}
                      onClick={() => increment(product.id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.cart__price}>
                    ${product.price * quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cart__summary}>
            <h2 className={styles.cart__totalPrice}>${totalPrice}</h2>
            <p className={styles.cart__totalLabel}>
              {`Total for ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            </p>

            <div className={styles.cart__summaryDivider} />

            <button
              type="button"
              className={styles.cart__checkout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
