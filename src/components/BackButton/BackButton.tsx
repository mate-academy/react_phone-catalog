import { useNavigate } from 'react-router-dom';
import './back-button.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-button button"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
