import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      back
    </button>
  );
};
