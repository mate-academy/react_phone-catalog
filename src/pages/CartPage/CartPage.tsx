import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useT } from '../../context/LanguageContext';
import { buildImageUrl } from '../../api/api';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalQuantity, totalPrice, increment, decrement, remove, clear } =
    useCart();
  const t = useT();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const checkout = () => setShowConfirm(true);
  const confirm = () => {
    clear();
    setShowConfirm(false);
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          ‹ {t('common.back')}
        </button>
        <h1 className={styles.h1}>{t('cart.title')}</h1>
        <div className={styles.empty}>
          <p>{t('cart.empty')}</p>
          <Link to="/phones" className={styles.shopLink}>
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ‹ {t('common.back')}
      </button>
      <h1 className={styles.h1}>{t('cart.title')}</h1>

      <div className={styles.layout}>
        <ul className={styles.items}>
          {items.map(({ product, quantity }) => (
            <li key={product.id} className={styles.item}>
              <div className={styles.itemLeft}>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(product.id)}
                  aria-label={t('aria.removeFromCart')}
                >
                  ×
                </button>
                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.itemImage}
                >
                  <img
                    src={buildImageUrl(product.image)}
                    alt={product.name}
                  />
                </Link>
                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.itemName}
                >
                  {product.name}
                </Link>
              </div>

              <div className={styles.itemRight}>
                <div className={styles.qty}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => decrement(product.id)}
                    disabled={quantity === 1}
                    aria-label={t('aria.decrease')}
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => increment(product.id)}
                    aria-label={t('aria.increase')}
                  >
                    +
                  </button>
                </div>
                <span className={styles.itemPrice}>
                  ${product.price * quantity}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <span className={styles.total}>${totalPrice}</span>
          <span className={styles.totalCaption}>
            {t('cart.totalFor')} {totalQuantity}{' '}
            {totalQuantity === 1 ? t('count.items_one') : t('count.items_many')}
          </span>
          <div className={styles.summaryDivider} />
          <button
            type="button"
            className={styles.checkout}
            onClick={checkout}
          >
            {t('cart.checkout')}
          </button>
        </aside>
      </div>

      {showConfirm && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowConfirm(false)}
        >
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className={styles.modalTitle}>{t('cart.modal.title')}</h3>
            <p className={styles.modalText}>{t('cart.modal.text')}</p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalCancel}
                onClick={() => setShowConfirm(false)}
              >
                {t('cart.modal.cancel')}
              </button>
              <button
                type="button"
                className={styles.modalConfirm}
                onClick={confirm}
              >
                {t('cart.modal.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
