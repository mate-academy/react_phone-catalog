import React from 'react';

import './Modal.scss';

import { ReactComponent as Cross }
  from '../../icons/icons-close.svg';

  type Props = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
  };

const Modal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <Cross
          className="modal-icon"
          onClick={() => onClose(prev => !prev)}
        />

        <h2 className="modal-text">
          We are sorry, but this feature is not implemented yet
        </h2>
      </div>
    </div>
  );
};

export default Modal;
