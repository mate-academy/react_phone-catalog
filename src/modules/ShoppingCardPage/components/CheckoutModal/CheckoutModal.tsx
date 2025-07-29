/* eslint-disable react/display-name */
import { FC, memo, useEffect } from 'react';
import styles from './CheckoutModal.module.scss';
import { useGlobalState } from '../../../../context/store';

type Props = {
  setIsModalOpen: (value: boolean) => void;
};

export const CheckoutModal: FC<Props> = memo(({ setIsModalOpen }) => {
  const { setCart } = useGlobalState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsModalOpen]);

  return (
    <div onClick={() => setIsModalOpen(false)} className={styles.modal}>
      <div onClick={e => e.stopPropagation()} className={styles.modalBody}>
        <h4 className={styles.modalMessage}>
          Checkout is not implemented yet. Do you want to clear the Card?
        </h4>

        <div className={styles.modalBtns}>
          <button onClick={() => setCart([])} className={styles.modalBtn}>
            Yes
          </button>

          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.modalBtn}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
});
