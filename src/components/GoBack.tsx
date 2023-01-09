import { useNavigate } from 'react-router-dom';
import { PrevArrowIcon } from './Icons/PrevArrowIcon';

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="go-back"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      <div className="go-back__icon">
        <PrevArrowIcon />
      </div>
      <span
        className="go-back__link"
      >
        Back
      </span>
    </button>
  );
};
