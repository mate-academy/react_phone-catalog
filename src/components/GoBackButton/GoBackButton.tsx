import { useNavigate } from 'react-router-dom';
import './GoBackButton.scss';

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      type="button"
      className="GoBackButton"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
