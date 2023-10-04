import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <button
      data-cy="backButton"
      type="button"
      className="back-button"
      onClick={handleGoBack}
    >
      Back
    </button>
  );
};
