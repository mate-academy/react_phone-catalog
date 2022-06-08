import React from 'react';
import './BackButtom.scss';

export const BackButton: React.FC = React.memo(() => (
  <button
    type="button"
    className="back-button"
    onClick={() => {
      window.history.back();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  >
    <span className="back-button__icon" />
    Back
  </button>
));
