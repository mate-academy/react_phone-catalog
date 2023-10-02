import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="back"
    >
      <div className="back_image" />
      <span className="back__title">Back</span>
    </button>
  );
};
