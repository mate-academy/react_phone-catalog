import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      data-cy="backButton"
      className="BackButton text"
    >
      Back
    </button>
  );
};
