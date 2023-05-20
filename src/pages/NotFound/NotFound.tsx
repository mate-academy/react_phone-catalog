import { useNavigate } from 'react-router-dom';

import './notFound.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">Page not found</h2>
      </div>
      <button
        className="not-found__button button"
        type="button"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};
