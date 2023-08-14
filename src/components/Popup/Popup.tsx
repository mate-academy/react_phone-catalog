import React, { useEffect } from 'react';

import './Popup.scss';

type Props = {
  onClose: () => void;
};
export const Popup: React.FC<Props> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

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
