import { useEffect } from 'react';
import { AccentButton } from '../../../../components/accentButton';
import { ProductWithQuantity } from '../../../../types/ProductWithQuantity';
import styles from './ModalWin.module.scss';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProducts: (products: ProductWithQuantity[]) => void;
};

export const ModalWin: React.FC<Props> = ({
  setShowModal,
  setSelectedProducts,
}) => {
  const handleClearCart = () => {
    setSelectedProducts([]);

    localStorage.setItem('selectedProducts', JSON.stringify([]));
    setShowModal(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowModal]);

  return (
    <div className={styles.modalwin}>
      <div className={styles.modalwin__content}>
        <div className={styles.modalwin__top}>
          <button
            onClick={() => setShowModal(false)}
            className={styles.modalwin__clsbutton}
          >
            <img src="img/icons/close.svg" alt="" />
          </button>

          <p className={styles.modalwin__text}>
            Checkout is not implemented yet. <br />
            Do you want to clear the Cart?
          </p>
        </div>

        <div className={styles.modalClearBtn}>
          <AccentButton text="Clear Cart" onClick={handleClearCart} />
        </div>
      </div>
    </div>
  );
};
