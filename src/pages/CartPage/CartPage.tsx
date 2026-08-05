import { Link } from 'react-router-dom';

import arrowLeftIcon from '../../assets/icons/arrow-left.svg';
import closeIcon from '../../assets/icons/close-button.svg';
import minusIcon from '../../assets/icons/minus-button.svg';
import plusIcon from '../../assets/icons/plus-button.svg';
import { useShop } from '../../context/ShopContext';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useShop();

  const totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const shouldClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      clearCart();
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <img src={arrowLeftIcon} alt="" className={styles.backIcon} />

          <span>Back</span>
        </Link>

        <h1 className={styles.title}>Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>

            <p className={styles.emptyText}>
              Add products to your cart to see them here.
            </p>

            <Link to="/phones" className={styles.catalogLink}>
              Go to catalogue
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.items}>
              {cart.map(({ product, quantity }) => {
                const productLink = `/product/${product.itemId}`;

                return (
                  <article key={product.itemId} className={styles.item}>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => {
                        removeFromCart(product.itemId);
                      }}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <img
                        src={closeIcon}
                        alt=""
                        className={styles.removeIcon}
                      />
                    </button>

                    <Link to={productLink} className={styles.imageLink}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                      />
                    </Link>

                    <Link to={productLink} className={styles.name}>
                      {product.name}
                    </Link>

                    <div className={styles.quantity}>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        disabled={quantity === 1}
                        onClick={() => {
                          decreaseQuantity(product.itemId);
                        }}
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <img
                          src={minusIcon}
                          alt=""
                          className={styles.quantityIcon}
                        />
                      </button>

                      <span className={styles.quantityValue}>{quantity}</span>

                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => {
                          increaseQuantity(product.itemId);
                        }}
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <img
                          src={plusIcon}
                          alt=""
                          className={styles.quantityIcon}
                        />
                      </button>
                    </div>

                    <strong className={styles.price}>
                      ${product.price * quantity}
                    </strong>
                  </article>
                );
              })}
            </div>

            <aside className={styles.summary}>
              <p className={styles.totalPrice}>${totalPrice}</p>

              <p className={styles.totalItems}>
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>

              <div className={styles.divider} />

              <button
                type="button"
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};
