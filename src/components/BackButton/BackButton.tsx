import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      className="BackButton"
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      <span className="small-text">
        back
      </span>
    </button>
  );
};
