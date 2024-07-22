import { useContext, useState } from 'react';
import { Product } from '../../types/Product';
import { CartContext, DispatchCartContext } from '../../store/CartContext';
import { getTotalPrice, getUniqueProducts } from '../../utils/helper';
import { CartItem } from '../CartItem';
import { CartEmpty } from '../CartEmpty';
import { CartModal } from '../CartModal';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './Cart.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import gStyles from '../../styles/general.module.scss';

export const Cart = () => {
  const cartState = useContext(CartContext);
  const dispatchCart = useContext(DispatchCartContext);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const { t } = useTranslation();

  const totalPrice = getTotalPrice(cartState);

  const onModalAccept = () => dispatchCart({ type: 'clear' });

  return (
    <section>
      <h1 className={styles.title}>{t(TRANSLATIONS.cart.title)}</h1>

      <div className={styles.content}>
        {cartState.length ? (
          <>
            <ul className={styles.list}>
              {getUniqueProducts(cartState).map((item: Product) => {
                return (
                  <li key={item.id} className={styles.item}>
                    <CartItem product={item} />
                  </li>
                );
              })}
            </ul>

            <div className={styles.total}>
              <div className={styles.totalPrice}>
                <h2>${totalPrice}</h2>
                <p className={styles.totalSubtitle}>
                  {t(TRANSLATIONS.cart.total_interval, {
                    postProcess: 'interval',
                    count: cartState.length,
                  })}
                </p>
              </div>
              <div className={gStyles.divider}></div>
              <button
                type="button"
                className={`${btnStyles.block} ${btnStyles.primary}`}
                onClick={() => setIsCheckout(true)}
                aria-label={t(TRANSLATIONS.cart.button.checkout.ariaLabel)}
              >
                {t(TRANSLATIONS.cart.button.checkout.text)}
              </button>
            </div>
          </>
        ) : (
          <CartEmpty />
        )}
      </div>

      {isCheckout && (
        <CartModal onAccept={onModalAccept} showModal={setIsCheckout} />
      )}
    </section>
  );
};
