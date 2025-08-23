import { useAppDispatch, useAppState } from '../../contexts/AppContext';
import styles from './ModalWindow.module.scss';
import { getTranslation } from '../shared/utils/getTranslation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWindow: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setCartProductsIds } = useAppDispatch();
  const { language } = useAppState();
  const t = getTranslation(language);

  function handleConfirm() {
    onClose();
    setCartProductsIds([]);
  }

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ''}`}
    >
      <h3 className={styles.title}>{t.modal.checkoutNotImplemented}</h3>

      <div className={styles.buttons}>
        <button
          onClick={onClose}
          className={`
            ${styles.button} 
            ${styles.cancel} 
            buttonText
          `}>{t.modal.cancel}</button>
        <button
          onClick={handleConfirm}
          className={`
            ${styles.button} 
            ${styles.confirm} 
            buttonText
          `}>{t.modal.confirm}</button>
      </div>
    </div>
  )
}