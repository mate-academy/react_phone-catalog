import { useAppSelector } from '../../../../api/hooks';
import styles from './CartSum.module.scss';
import { useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';
const CartSum = () => {
  const cart = useAppSelector(state => state.cart.cartList);
  const totalSum = cart.reduce((sum, el) => sum + el.price * el.quantity, 0);
  const totalCount = cart.reduce((sum, el) => sum + 1 * el.quantity, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.sum}>
      <div className={styles.top}>
        <h2 className={styles.price}>${totalSum}</h2>
        <span className={styles.total}>
          {t('total')} {totalCount} {t('items')}
        </span>
      </div>
      <button className={styles.btn} onClick={() => setIsModalOpen(true)}>
        {t('checkout')}
      </button>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default CartSum;
