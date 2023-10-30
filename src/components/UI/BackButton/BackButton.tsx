import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className="back"
      data-cy="backButton"
      onClick={moveBack}
    >
      Back
    </button>
  );
};
