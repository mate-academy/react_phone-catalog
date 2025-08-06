import { useAppContext } from '../../contexts/AppContext';
import styles from './ModalWindow.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWindow: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setCartProductsIds } = useAppContext();

  function handleConfirm() {
    onClose();
    setCartProductsIds([]);
  }

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ''}`}
    >
      <h3 className={styles.title}>Checkout is not implemented yet. Do you want to clear the Cart?</h3>

      <div className={styles.buttons}>
        <button
          onClick={onClose}
          className={`
            ${styles.button} 
            ${styles.cancel} 
            buttonText
          `}>Cancel</button>
        <button
          onClick={handleConfirm}
          className={`
            ${styles.button} 
            ${styles.confirm} 
            buttonText
          `}>Confirm</button>
      </div>
    </div>
  )
}