import { useNavigate } from 'react-router-dom';

export const NoSearchResults = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/');

  return (
    <div className="no-results">
      <h2 className="no-results__title">
        No matches were found. Please try again or go to the Home page.
      </h2>
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
