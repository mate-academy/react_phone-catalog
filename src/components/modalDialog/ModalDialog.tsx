import React, { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import './ModalDialog.scss';

type Props = {
  value: string;
};

export const ModalDialog: React.FC<Props> = ({ value }) => {
  const { clearCart, setModal } = useContext(ProductsContext);

  const handlerConfirmClearCart = () => {
    clearCart();
    setModal('');
  };

  return (
    <div className="modal">
      <div className="modal-window">
        <div className="modal-title">
          {value === 'Cart' ? (
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
          ) : (
            <p>This feature is not implemented yet.</p>
          )}
        </div>
        <div className="modal__block-buttons">
          {value === 'Cart' ? (
            <>
              <button
                className="modal-button"
                type="button"
                onClick={handlerConfirmClearCart}
              >
                Confirm
              </button>
              <button
                className="modal-button"
                onClick={() => setModal('')}
                type="button"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="modal-button"
              onClick={() => setModal('')}
              type="button"
            >
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
