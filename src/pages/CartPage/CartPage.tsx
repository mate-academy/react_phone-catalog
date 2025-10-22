import classNames from 'classnames';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useCartStore from '../../stores/useCartStore';
import useLanguageStore from '../../stores/useLanguageStore';
import styles from './CartPage.module.scss';

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  const { t } = useLanguageStore();

  return (
    <div className={styles.cart}>
      <Breadcrumbs product={null} />

      <h1 className={styles.cart__title}>{t('nav_cart')}</h1>
      {cartItems.length === 0 ? (
        <p>Кошик порожній.</p>
      ) : (
        <div className={styles.cart__content}>
          <ul className={styles['cart__items-list']}>
            {cartItems.map(item => (
              <li className={styles['cart-item']} key={item.id}>
                <div className={styles['cart-item__main-info']}>
                  <button
                    className={styles['cart-item__remove-button']}
                    onClick={() => removeFromCart(item.id)}
                  ></button>
                  <div className={styles['cart-item__image-container']}>
                    <img
                      className={styles['cart-item__image']}
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <p className={styles['cart-item__name']}>{item.name}</p>
                </div>

                <div className={styles['cart-item__actions-group']}>
                  <div className={styles['cart-item__counter']}>
                    <button
                      className={classNames(
                        styles['cart-item__counter-button'],
                        styles['cart-item__counter-button--decrease'],
                      )}
                      onClick={() => decreaseQuantity(item.id)}
                    ></button>
                    <p className={styles['cart-item__counter-value']}>
                      {item.quantity}
                    </p>
                    <button
                      className={classNames(
                        styles['cart-item__counter-button'],
                        styles['cart-item__counter-button--increase'],
                      )}
                      onClick={() => increaseQuantity(item.id)}
                    ></button>
                  </div>

                  <h3 className={styles['cart-item__price']}>${item.price}</h3>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.cart__summary}>
            <h2 className={styles['cart__summary-total-price']}>
              ${getTotalPrice()}
            </h2>

            <p className={styles['cart__summary-info']}>
              Total for {getTotalItems()} items
            </p>

            <div className={styles['cart__summary-divider']}></div>

            <button
              className={styles['cart__checkout-button']}
              onClick={clearCart}
            >
              {t('cart_checkout_button')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
