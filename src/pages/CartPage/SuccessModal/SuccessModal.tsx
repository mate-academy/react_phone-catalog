import React from 'react';
import './SuccessModal.scss';

type Props = {
  onFinish: () => void;
};

export const SuccessModal: React.FC<Props> = ({ onFinish }) => {
  return (
    <div className="modal__overlay">
      <div className="modal__success">
        <h2 className="modal__success--title">Thank you for your order!</h2>
        <p className="modal__success--text">Our operator will contact you</p>
        <button className="modal__confirm" onClick={onFinish}>
          Finish
        </button>
      </div>
    </div>
  );
};
