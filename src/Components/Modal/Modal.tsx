import React from 'react';
import './Modal.scss';

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = ({ setActive }) => {
  return (
    <div className="modal" onClick={() => setActive(false)}>
      <div className="modal__content">
        <h1 className="modal__title">Checkout is not implemented yet</h1>
        <p className="modal__desc">click anywhere to leave</p>
      </div>
    </div>
  );
};
