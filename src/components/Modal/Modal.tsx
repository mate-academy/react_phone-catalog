import React from 'react';
import { useDispatch } from '../../hooks/hooks';

import './Modal.scss';

type Props = {
  onCloseModal: () => void;
};

export const Modal: React.FC<Props> = ({ onCloseModal }) => {
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div className="modal__window">
        <h2 className="modal__title">Checkout is not implemented yet.</h2>
        <p className="modal__text">Do you want to clear the Cart?</p>
        <div className="modal__buttons">
          <button
            type="button"
            className="modal__button modal__button--confirm"
            onClick={() => {
              dispatch({ type: 'clearCart' });
              onCloseModal();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="modal__button modal__button--cancel"
            onClick={() => onCloseModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
