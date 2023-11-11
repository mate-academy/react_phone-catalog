import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-cy="backButton"
      className="BackButton"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
