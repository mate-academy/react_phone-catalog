//#region imports
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/hooks/useTheme';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import styles from './CartEmpty.module.scss';
//#endregion

export const CartEmpty = () => {
  const { t } = useTranslation('cart');
  const { isDark } = useTheme();

  const src = isDark
    ? 'img/darkTheme/cart-is-empty.png'
    : 'img/cart-is-empty.png';

  return (
    <section className={styles.emptyCart}>
      <h1>{capitalizeFirstWord(t('emptyCart'))}</h1>

      <img className={styles.emptyCartImg} src={src} alt="Empty cart" />
    </section>
  );
};
