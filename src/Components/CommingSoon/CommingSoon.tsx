import './CommingSoon.scss';
import React from 'react';
import comingSoonImg from '../../assets/coming-soon.png';

type Props = {
  onClose: (value: boolean) => void;
};

export const ComingSoon: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="ComingSoon">
      <div className="ComingSoon__modal">
        <button
          type="button"
          className="ComingSoon__modal-button"
          onClick={() => onClose(false)}
        >
          <div className="icon icon--remove" />
        </button>
        <img
          src={comingSoonImg}
          className="ComingSoon__modal-image"
          alt="Coming Soon"
        />
        <p className="ComingSoon__modal-message">
          Sorry, this feature has not been implemented yet!
        </p>
      </div>
    </div>
  );
};
