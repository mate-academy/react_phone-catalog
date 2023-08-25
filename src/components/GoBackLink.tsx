import { useNavigate } from 'react-router-dom';
import { IconSlideLeft } from '../utils/Icons';

const GoBackLink = () => {
  const navigate = useNavigate();

  return (
    <div className="go-back">
      <IconSlideLeft />

      <button
        type="button"
        className="go-back__button"
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        Back
      </button>
    </div>
  );
};

export default GoBackLink;
