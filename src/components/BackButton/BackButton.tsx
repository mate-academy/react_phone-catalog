import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

const BackButton = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      data-cy="backButton"
      className="backButton"
      onClick={() => navigateBack()}
    >
      Back
    </button>
  );
};

export default BackButton;
