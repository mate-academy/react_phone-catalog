import { useNavigate } from 'react-router-dom';
import iconVector from '../../helpers/icons/icon_vector.svg';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="BackButton">
      <img
        src={iconVector}
        alt="Vector Icon"
        className="BackButton__vector"
      />
      <button
        data-cy="backButton"
        className="BackButton__button"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
