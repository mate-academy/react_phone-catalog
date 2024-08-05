import emptyCart from '../../images/cart-is-empty.png';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.message}>{t(TRANSLATIONS.cart.empty.title)}</h2>
      <div className={styles.imageFrame}>
        <img
          src={emptyCart}
          alt={t(TRANSLATIONS.cart.empty.image.alt)}
          className={styles.image}
        />
      </div>
    </>
  );
};
