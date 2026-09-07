import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart } from '../shared/context/CartContext';
import styles from './CartPage.module.scss';
import { Button } from '../../components/UI/Button/Button';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { Product } from '../shared/types';

const SHIPPING_PRICE = 0;

const getProductPrice = (product: Product) =>
  product.priceDiscount ??
  product.fullPrice ??
  product.priceRegular ??
  product.discountPrice ??
  product.price ??
  0;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const isCartEmpty = cart.length === 0;

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + getProductPrice(item.product) * item.quantity,
        0,
      ),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const shippingCost = isCartEmpty ? 0 : SHIPPING_PRICE;
  const grandTotal = subtotal + shippingCost;

  const handleClearCart = () => {
    if (window.confirm(t('clearCartConfirm') || 'Очистити всю корзину')) {
      clearCart();
    }
  };

  return (
    <section className={styles.cart}>
      <Breadcrumbs />
      <BackButton />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('cart')}</h1>
          {!isCartEmpty && (
            <p className={styles.counter}>
              {totalItems} {t('items')}
            </p>
          )}
        </div>

        {!isCartEmpty && (
          <Button
            variant="secondary"
            size="sm"
            className={styles.clearCartButton}
            onClick={handleClearCart}
          >
            {t('clearCart')}
          </Button>
        )}
      </div>

      {isCartEmpty ? (
        <div className={styles.emptyState}>
          <img
            src="img/cart-is-empty.png"
            alt={t('cartEmpty')}
            className={styles.emptyImage}
          />

          <h2>{t('cartEmpty')}</h2>
          <p className={styles.emptyText}>{t('cartEmptyDescription')}</p>

          <Link to="/" className={styles.emptyCta}>
            {t('continueShopping')}
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.itemsList}>
            {cart.map(item => {
              const unitPrice = getProductPrice(item.product);
              const originalPrice =
                item.product.fullPrice ??
                item.product.priceRegular ??
                unitPrice;
              const lineTotal = unitPrice * item.quantity;

              return (
                <article className={styles.itemCard} key={item.id}>
                  <button
                    type="button"
                    className={styles.removeButton}
                    aria-label={t('removeFromCart')}
                    onClick={() => removeFromCart(item.id)}
                  >
                    &times;
                  </button>

                  <div className={styles.cardMain}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                      />
                    </div>

                    <div className={styles.info}>
                      <p className={styles.name}>{item.product.name}</p>

                      <div className={styles.meta}>
                        {item.product.color && (
                          <span>
                            {t('color')}: <strong>{item.product.color}</strong>
                          </span>
                        )}
                        {item.product.capacity && (
                          <span>
                            {t('capacity')}:{' '}
                            <strong>{item.product.capacity}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardControls}>
                    <div className={styles.quantityControls}>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        aria-label={t('quantity')}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantityValue}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        aria-label={t('quantity')}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.priceBlock}>
                      <div className={styles.unitPrice}>
                        <span className={styles.currentPrice}>
                          {formatCurrency(unitPrice)}
                        </span>
                        {originalPrice > unitPrice && (
                          <span className={styles.previousPrice}>
                            {formatCurrency(originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className={styles.lineTotal}>
                        {formatCurrency(lineTotal)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>{t('orderSummary')}</h2>

            <div className={styles.summaryRow}>
              <span>{t('cartSubtotal')}</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>{t('items')}</span>
              <span>{totalItems}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>{t('cartShipping')}</span>
              <span>
                {shippingCost === 0 ? t('free') : formatCurrency(shippingCost)}
              </span>
            </div>

            <p className={styles.shippingNote}>{t('cartShippingNote')}</p>

            <div className={styles.summaryTotal}>
              <span>{t('total')}</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <Button size="lg" className={styles.checkoutButton}>
              {t('checkout')}
            </Button>
          </aside>
        </div>
      )}
    </section>
  );
};
