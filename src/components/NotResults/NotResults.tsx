import { useNavigate } from 'react-router-dom';
import './not-results.scss';

export const NotResults = () => {
  const navigate = useNavigate();

  return (
    <div className="not-results">
      <div className="not-results__title">We are sorry, products not found</div>
      <button
        className="not-results__button button"
        type="button"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};
