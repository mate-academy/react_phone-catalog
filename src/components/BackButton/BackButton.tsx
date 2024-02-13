import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="icon icon-left button-container">
      <button
        data-cy="backButton"
        type="button"
        className="button-container__button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
