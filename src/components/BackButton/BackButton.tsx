import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      type="button"
      className="back-button"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
