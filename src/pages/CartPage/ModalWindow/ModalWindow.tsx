import cn from 'classnames';
import styles from './ModalWindow.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../store/ProductContext';

type Props = {
  setIsModalOpen: (value: boolean) => void;
};

export const ModalWindow: React.FC<Props> = ({ setIsModalOpen }) => {
  const { setCart } = useContext(ProductContext);

  return (
    <div
      className={styles.modalWindow__overlay}
      onClick={() => setIsModalOpen(false)}
    >
      <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
        <h3 className={styles.modalWindow__title}>
          Checkout is not implemented yet. <br></br>Do you want to clear the
          Cart?
        </h3>
        <div className={styles.modalWindow__buttons}>
          <button
            onClick={() => setCart([])}
            className={cn(
              styles.modalWindow__button,
              styles['modalWindow__button--yes'],
            )}
          >
            Yes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className={cn(
              styles.modalWindow__button,
              styles['modalWindow__button--no'],
            )}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
