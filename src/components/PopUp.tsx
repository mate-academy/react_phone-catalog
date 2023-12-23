import React from 'react';
import './PopUp.scss';

type Props = {
  onClose: () => void,
};

export const Popup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup__container">
        <h2 className="popup__title">
          We are sorry, but this feature is not implemented yet
        </h2>
        <button className="popup__btn" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
  );
};
