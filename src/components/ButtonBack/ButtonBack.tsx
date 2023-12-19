import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <div className="button-back">
      <div className="icon icon--arrow-left" />

      <button
        type="button"
        data-cy="backButton"
        className="button-back__link"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
