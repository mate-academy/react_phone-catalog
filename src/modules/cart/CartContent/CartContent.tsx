import { CartItem } from '../CartItem';
import styles from './CartContent.module.scss';
import { useTranslation } from 'react-i18next';

export const CartContent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h2 className={styles.title}>{t('cart.title')}</h2>
        <CartItem />
      </div>
    </div>
  );
};
