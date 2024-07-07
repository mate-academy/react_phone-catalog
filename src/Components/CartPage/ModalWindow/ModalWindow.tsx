import './ModalWindow.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../store/ProductContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalWindow = ({ isOpen, onClose }: Props) => {
  const { inCart, removeProductFromCart } = useContext(ProductContext);

  function handleConfirm() {
    inCart.forEach(elem => removeProductFromCart(elem));
    onClose();
  }

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__wrapper">
            <div className="modal__content">
              <p className="modal__text">
                Checkout is not implemented yet. <br /> Do you want to clear the
                Cart?
              </p>

              <div className="modal__buttons">
                <button
                  className="modal__confirm button"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button className="modal__cancel button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
