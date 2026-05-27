import './Popup.scss';
import React from 'react';

interface Props {
  onClose: () => void;
}

export const Popup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__content" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Close popup"
        >
          &times;
        </button>

        <h2 className="popup__header">Thanks for your order</h2>
        <p className="popup__message">
          Your order has been successfully placed. We will contact you shortly
          to confirm the details.
        </p>
      </div>
    </div>
  );
};
