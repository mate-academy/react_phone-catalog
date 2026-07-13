import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { CartItem } from './components/CartItem/CartItem';
import { CartEmpty } from './components/CartEmpty/CartEmpty';
import classNames from 'classnames';
import { useState } from 'react';
import { ModalDialog } from './components/ModalDialog/ModalDialog';
import { useTranslation } from 'react-i18next';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { items, totalQuantity, removeAllFromCart } = useCart();

  const { t } = useTranslation();

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.product.priceDiscount * item.quantity;
  }, 0);

  const handleConfirm = () => {
    removeAllFromCart();
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
      <div className={styles.cartPage}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <img src="/img/icons/arrow_left.svg" alt="back" />
          <p className={styles.backText}>{t('Back')}</p>
        </button>
        <h1 className={styles.cartTitle}>{t('Cart')}</h1>

        <div className={styles.cart}>
          {items.length > 0 ? (
            <div className={styles.cartProductsSection}>
              <div className={styles.productsList}>
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    name={item.product.name}
                    image={item.product.images[0]}
                    price={item.product.priceDiscount}
                    quantity={item.quantity}
                    id={item.id}
                  />
                ))}
              </div>
              <div className={styles.productsPrice}></div>
            </div>
          ) : (
            <CartEmpty />
          )}

          <div className={styles.totalPriceSection}>
            <div className={styles.totalPriceTextSecton}>
              <h2 className={styles.totalPriceTitle}>${totalPrice}</h2>
              <p className={styles.totalPriceText}>
                {t('Total')} {totalQuantity} {t('items')}
              </p>
            </div>
            <button
              className={classNames(
                styles.checkoutButton,
                items.length === 0 && styles.checkoutButtonDisabled,
              )}
              onClick={() => setIsModalOpen(true)}
              disabled={items.length === 0}
            >
              {t('Checkout')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
