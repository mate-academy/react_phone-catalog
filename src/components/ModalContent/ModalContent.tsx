import { useCart } from '../../context/CartContext';
import modalStyles from './ModalContent.module.scss';

interface Props {
  onClose: () => void;
}

const ModalContent: React.FC<Props> = ({ onClose }) => {
  const { setCartItems } = useCart();

  return (
    <>
      <div className={modalStyles.modal__wrapper}>
        <div className={modalStyles.modal}>
          <h1 className={modalStyles.modal__title}>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </h1>

          <div className={modalStyles.modal__buttons}>
            <button
              className={modalStyles.modal__button__accept}
              onClick={() => {
                onClose();
                setCartItems([]);
              }}
            >
              Checkout order
            </button>
            <button
              onClick={() => onClose()}
              className={modalStyles.modal__button__cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalContent;
