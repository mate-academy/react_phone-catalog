import { useCart } from '../CartProvider/CartProvider';
import { BackButton } from '../shared/BackButton';
import { CartItemHolder } from './CartItem';
import { useLanguage } from '../../contexts/LanguageContext';

import styles from './CartPage.module.scss';
import globalStyle from '../../styles/index.module.scss';
import { X } from 'lucide-react';
import { useState } from 'react';

export const CartPage = () => {
  const { getFromCart, removeFromCart, getTotal } = useCart();
  const { t } = useLanguage();
  const itemsInCart = getFromCart();
  const totalPrice = getTotal(itemsInCart).allPrice();
  const totalItems = getTotal(itemsInCart).Items();
  const [popup, setPopup] = useState<boolean>(false);

  const handleCheckout = () => {
    itemsInCart.forEach(item => removeFromCart(item));
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className={styles.cartPage__Container}>
      {popup && (
        <div className={styles.cartPage__Overlay} onClick={closePopup}>
          <div
            className={styles.cartPage__Popup}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.cartPage__PopupHeader}>
              <X className={styles.cartPage__PopupClose} onClick={closePopup} />
            </div>

            <img
              src="img/new/LogoLightTheme.svg"
              className={styles.cartPage__PopupImage}
            />

            <div className={styles.cartPage__PopupContent}>
              <h1>Thanks for your purchase!</h1>
            </div>
          </div>
        </div>
      )}
      {totalItems > 0 ? (
        <>
          <BackButton />
          <h1>{t('cart.title')}</h1>
          <div className={styles.cartPage__Body}>
            <div className={styles.cartPage__ItemList}>
              {itemsInCart.map(item => (
                <CartItemHolder item={item} key={item.id} />
              ))}
            </div>
            <div className={styles.cartPage__Info}>
              <div className={styles.cartPage__InfoHeader}>
                <h1>${totalPrice}</h1>
                <p>
                  {t('cart.totalFor')} {totalItems} {t('favorites.items')}
                </p>
              </div>
              <button
                className={`${globalStyle.btnPrimary} ${styles.cartButton}`}
                onClick={() => handleCheckout()}
              >
                {t('cart.checkout')}
              </button>
            </div>
          </div>
        </>
      ) : (
        <img
          src="img/cart-is-empty.png"
          alt={t('cart.emptyAlt')}
          className={globalStyle.emptyStateImage}
        />
      )}
    </div>
  );
};
