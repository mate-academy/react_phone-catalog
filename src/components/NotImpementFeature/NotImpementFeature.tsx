import './NotImpementFeature.scss';
import React from 'react';
import notImpement from '../../assets/not-implement.jpg';

type Props = {
  onClose: (value: boolean) => void;
};

export const NotImpementFeature: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="not-implement">
      <div className="not-implement__modal">
        <button
          type="button"
          aria-label="button"
          className="not-implement__modal-button"
          onClick={() => onClose(false)}
        >
          <div className="icon icon-cross" />
        </button>
        <div className="not-implement__content">
          <p className="not-implement__modal-message">
            Sorry, this feature has not been implemented yet.
          </p>
          <img
            src={notImpement}
            className="not-implement__modal-image"
            alt="not-implement-message"
          />
        </div>
      </div>
    </div>
  );
};
