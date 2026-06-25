import { useNavigate } from 'react-router-dom';
import styles from './CartContent.module.scss';
import { CartItem } from '../CartItem/CartList';
import { useTranslation } from 'react-i18next';

export const CartContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          aria-label={t('cart.back')}
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            }
          }}
        >
          <img src="/img/icons/left.svg" alt="" className={styles.back} />
          {t('cart.back')}
        </button>

        <h2 className={styles.title}>{t('cart.title')}</h2>
        <CartItem />
      </div>
    </div>
  );
};
