import { FC } from 'react';
import './NotFoundPage.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/');

  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title">Page not found</h1>
      <button
        type="button"
        className="no-results__button rectangular-button"
        onClick={handleGoHome}
      >
        Visit Home page
      </button>
    </div>
  );
};
