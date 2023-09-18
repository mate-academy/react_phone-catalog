import React, { useCallback } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import './Modal.scss';

type Props = {
  setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>
};

export const Modal: React.FC<Props> = ({ setIsCheckout }) => {
  const handleCloseClick = useCallback(() => setIsCheckout(false), []);

  return (
    <div className="modal">
      <div className="modal__content">
        <h1 className="modal__message">
          We are sorry, but this feature is not implemented yet
        </h1>

        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
