import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { CartList } from './components/CartList/CartList';
import { useProducts } from '../../context/ProductsContext';
import { useTranslation } from 'react-i18next';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useProducts();
  const { t } = useTranslation();

  return (
    <div className={styles.cart}>
      <div className={styles.cart__back} onClick={() => navigate(-1)}>
        <div className={styles.cart__back__arrow}></div>
        <div className={styles.cart__back__text}>{t('back')}</div>
      </div>
      <h1 className={styles.cart__title}>{t('cart')}</h1>

      {cart.length > 0 ? (
        <CartList />
      ) : (
        <div className={styles.cart__empty}></div>
      )}
    </div>
  );
};
