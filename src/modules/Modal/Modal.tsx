import React from 'react';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export const Modal: React.FC<Props> = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <h3 className="modal__title">
          <span>Checkout is not implemented yet.</span> <br />
          <span>Do you want to clear the Cart?</span>
        </h3>

        <div className="modal__buttons">
          <button type="button" className="modal__button" onClick={onConfirm}>
            Yes
          </button>
          <button type="button" className="modal__button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
