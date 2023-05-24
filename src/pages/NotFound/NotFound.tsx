import { useNavigate } from 'react-router-dom';

import './notFound.scss';

export const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">Page not found</h2>
      </div>
      <button
        className="not-found__button button"
        type="button"
        onClick={handleNavigate}
      >
        Go Home
      </button>
    </div>
  );
};
