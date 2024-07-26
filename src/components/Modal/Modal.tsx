import React from 'react';
import './Modal.scss';

type Props = {
  closeModal: () => void;
};

export const Modal: React.FC<Props> = ({ closeModal }) => {
  const handleClearCart = () => {
    localStorage.removeItem('cart');
    window.location.reload();
    closeModal();
  };

  return (
    <div className="modal">
      <button className="modal__close" onClick={closeModal}>
        <div className="icon icon--close"></div>
      </button>
      <div className="modal__content">
        <button className="modal__close" onClick={closeModal}>
          <div className="icon icon--close"></div>
        </button>

        <p className="modal__content--text">
          Checkout is not implemented yet. <br /> Do you want to clear the Cart?
        </p>
        <div className="modal__content--box modal-box">
          <button onClick={handleClearCart} className="modal-box__button">
            Yes
          </button>
          <button onClick={closeModal} className="modal-box__button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
