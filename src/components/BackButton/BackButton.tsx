import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      className="backButton"
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      <span className="backButton__icon">
        back
      </span>
    </button>
  );
};
