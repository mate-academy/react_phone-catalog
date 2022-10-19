import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="backButton"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
