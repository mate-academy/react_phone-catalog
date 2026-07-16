import { Link, useNavigate } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { useStore } from '../../context/StoreContext';

import styles from './CartPage.module.scss';

const getIconSrc = (iconName: string) => {
  return `${import.meta.env.BASE_URL}img/icons/${iconName}`;
};

const getImageSrc = (imagePath: string) => {
  return `${import.meta.env.BASE_URL}${imagePath}`;
};

export const CartPage = () => {
  const navigate = useNavigate();

  const {
    products,
    isLoading,
    error,
    reloadProducts,
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    changeQuantity,
    clearCart,
  } = useStore();

  const cartProducts = products.filter(product => {
    return Boolean(cart[product.id]);
  });

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    const shouldClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      clearCart();
    }
  };

  if (isLoading) {
    return (
      <section className={styles.cartPage}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.cartPage}>
        <div className={styles.message}>
          <p>{error}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={reloadProducts}
          >
            Reload
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cartPage}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <img
          src={getIconSrc('chevron-arrow-left.svg')}
          alt=""
          className={styles.backIcon}
        />

        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartProducts.length === 0 ? (
        <div className={styles.empty}>
          <img
            src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
            alt=""
            className={styles.emptyImage}
          />

          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.items}>
            {cartProducts.map(product => {
              const quantity = cart[product.id];
              const itemTotal = product.price * quantity;

              return (
                <article key={product.id} className={styles.item}>
                  <button
                    type="button"
                    className={styles.removeButton}
                    aria-label={`Remove ${product.name} from cart`}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <img
                      src={getIconSrc('close.svg')}
                      alt=""
                      className={styles.removeIcon}
                    />
                  </button>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.imageLink}
                  >
                    <img
                      src={getImageSrc(product.image)}
                      alt={product.name}
                      className={styles.image}
                    />
                  </Link>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.nameLink}
                  >
                    {product.name}
                  </Link>

                  <div className={styles.quantity}>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      aria-label={`Decrease quantity of ${product.name}`}
                      disabled={quantity === 1}
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      <span aria-hidden="true">&minus;</span>
                    </button>

                    <span className={styles.quantityValue}>{quantity}</span>

                    <button
                      type="button"
                      className={styles.quantityButton}
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>

                  <strong className={styles.itemTotal}>${itemTotal}</strong>
                </article>
              );
            })}
          </div>

          <aside className={styles.summary}>
            <strong className={styles.totalPrice}>${cartTotal}</strong>

            <p className={styles.totalItems}>
              Total for {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>

            <div className={styles.summaryDivider} />

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
    </section>
  );
};
