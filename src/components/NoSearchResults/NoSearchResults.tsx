import { useNavigate } from 'react-router-dom';
import './NoSearchResults.scss';

export const NoSearchResults = () => {
  const navigate = useNavigate();

  return (
    <div className="no-results">
      <h2 className="no-results__title">
        No matches were found. Please try again or go to the Home page.
      </h2>
      <button
        type="button"
        className="no-results__button rectangular-button"
        onClick={() => navigate('/')}
      >
        Visit Home page
      </button>
    </div>
  );
};
