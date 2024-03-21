import React from 'react';

import '../styles/BackButton.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-cy="backButton"
      className="back-button"
      onClick={() => navigate('..')}
    >
      Back
    </button>
  );
};
