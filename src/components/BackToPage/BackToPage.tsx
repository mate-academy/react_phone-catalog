import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackToPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="product-info__back back-to-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="back-to-page__link"
        data-cy="backButton"
      >
        &lt;
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="back-to-page__link"
        data-cy="backButton"
      >
        Back
      </button>
    </div>
  );
};
