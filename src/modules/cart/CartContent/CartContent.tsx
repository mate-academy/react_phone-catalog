import styles from './CartContent.module.scss';
import { CartList } from '../CartList/CartList';
import { useTranslation } from 'react-i18next';

export const CartContent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h2 className={styles.title}>{t('cart.title')}</h2>
        <CartList />
      </div>
    </div>
  );
};
