import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

import styles from './CartPage.module.scss';
import { useLanguage } from '../../context/LanguageContext';

import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/helpers';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
  } = useCart();

  useEffect(() => {
    document.title = t('cart.documentTitle');
  }, [t]);

  const handleRemove = (id: string) => {
    if ('startViewTransition' in document) {
      (
        document as unknown as {
          startViewTransition: (cb: () => void) => void;
        }
      ).startViewTransition(() => {
        flushSync(() => {
          removeFromCart(id);
        });
      });
    } else {
      removeFromCart(id);
    }
  };

  const handleCheckout = () => {
    const confirmClear = window.confirm(t('cart.checkoutAlert'));

    if (confirmClear) {
      clearCart();
    }
  };

  return (
    <div className={`${styles.cartPage} container`} data-testid="cart-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        <i className="fa-solid fa-chevron-left" />
        <span>{t('cart.back')}</span>
      </button>

      <h1 className={styles.title}>{t('cart.title')}</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src={getAssetUrl('img/cart-is-empty.png')}
            alt="Cart is empty"
            className={styles.emptyImage}
          />
          <h2 className={styles.emptyTitle}>{t('cart.emptyTitle')}</h2>
          <p className={styles.emptyText}>{t('cart.emptyText')}</p>
          <Link to="/" className={styles.shopBtn}>
            {t('cart.startShopping')}
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cartItems.map(item => {
              const { id, quantity, product } = item;

              return (
                <div
                  key={id}
                  className={styles.cartItem}
                  data-testid="cart-item"
                  style={
                    {
                      viewTransitionName: `cart-item-${id}`,
                    } as React.CSSProperties
                  }
                >
                  <button
                    type="button"
                    onClick={() => handleRemove(id)}
                    className={styles.removeBtn}
                    aria-label={t('cart.removeItem', { name: product.name })}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.imageLink}
                  >
                    <img src={getAssetUrl(product.image)} alt={product.name} />
                  </Link>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.nameLink}
                  >
                    {product.name}
                  </Link>

                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(id, quantity - 1)}
                      disabled={quantity <= 1}
                      className={styles.qtyBtn}
                      aria-label={t('cart.decreaseQty')}
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className={styles.qtyBtn}
                      aria-label={t('cart.increaseQty')}
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>

                  <div className={styles.price}>
                    ${product.price * quantity}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.totalPrice}>${totalPrice}</div>
            <div className={styles.totalCount}>
              {totalQuantity === 1
                ? t('cart.totalForCount_1', { count: totalQuantity })
                : t('cart.totalForCount', { count: totalQuantity })}
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className={styles.checkoutBtn}
            >
              {t('cart.checkout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
