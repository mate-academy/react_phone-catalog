import { useEffect, useState } from 'react';
import { Button } from '../../../../components/Button';
import styles from './ModalDialog.module.scss';
import classNames from 'classnames';
import { useShoppingCart } from '../../../../store/CartContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);

    return isOpen ? setIsActive(true) : setIsActive(false);
  }, [isOpen]);

  const confirm = () => {
    clearCart();
    onClose();
  };

  return (
    <div
      className={classNames(styles.modalOverlay, {
        [styles.modalOverlay__active]: isActive,
      })}
    >
      <div
        className={classNames(styles.modal, {
          [styles.modal__active]: isActive,
        })}
      >
        <h4>Checkout is not implemented yet.</h4>
        <p className={styles.modal__question}>Do you want to clear the Cart?</p>
        <div className={styles.modal__btns}>
          <div onClick={confirm}>
            <Button text="Confirm" />
          </div>
          <div className={styles.modal__cancelBtn} onClick={onClose}>
            <Button text="Cancel" />
          </div>
        </div>
      </div>
    </div>
  );
};
