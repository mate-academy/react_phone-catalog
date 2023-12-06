import { useNavigate } from 'react-router-dom';

import './BackButton.scss';
import iconVector from '../../helpers/icons/icon_vector.svg';

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
        type="button"
        className="BackButton__button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
