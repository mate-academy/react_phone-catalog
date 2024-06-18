import React, { useEffect, useRef } from 'react';
import './Modal.scss';

type Props = {
  action: () => void;
  closeModal: () => void;
};

export const Modal: React.FC<Props> = ({ action, closeModal }) => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const handleEscapeClick = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscapeClick);
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }

    return () => {
      window.removeEventListener('keyup', handleEscapeClick);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={closeModal}></div>
      <div className="modal__window">
        <button className="modal__close-button" onClick={closeModal}></button>
        <div className="modal__message">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </div>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button--black"
            tabIndex={1}
            ref={modalRef}
            onClick={() => {
              action();
              closeModal();
            }}
          >
            yes
          </button>
          <button className="modal__button" onClick={closeModal} tabIndex={2}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};
