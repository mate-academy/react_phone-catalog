import React from 'react';
import './Modal.scss';

type Props = {
  onClose: () => void;
  onClearCart: () => void;
};

export const Modal: React.FC<Props> = ({ onClose, onClearCart }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__top">
          <p className="modal__text">
            Checkout is not implemented yet.
            <br /> Do you want to clear the Cart?
          </p>
          <button className="modal__close-button" onClick={onClose}>
            <img src="/img/icons/Close.svg" alt="Close" />
          </button>
        </div>

        <button className="modal__clear-button" onClick={onClearCart}>
          Yes
        </button>
      </div>
    </div>
  );
};
