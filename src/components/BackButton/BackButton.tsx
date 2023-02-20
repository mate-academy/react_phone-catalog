import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="backButton"
      type="button"
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      <img src="./img/arrowLeft.svg" alt="back" />
      Back
    </button>
  );
};
