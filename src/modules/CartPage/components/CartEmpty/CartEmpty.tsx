import { useTranslation } from 'react-i18next';
import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.cartEmpty}>
      <h3 className={styles.title}>{t('CartEmpty')}</h3>
    </div>
  );
};
