import React from 'react';
import './CartModal.scss';

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CartModal: React.FC<Props> = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__window">
        <h4 className="modal__text">
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </h4>
        <div className="modal__buttons">
          <button className="modal__buttons--cancel buttons" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal__buttons--confirm buttons"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
