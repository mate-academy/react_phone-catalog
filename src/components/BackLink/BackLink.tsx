import { useNavigate } from 'react-router-dom';
import iconVector from '../../helpers/icons/icon_vector.svg';
import './BackLink.scss';

export const BackLink = () => {
  const navigate = useNavigate();

  return (
    <div className="BackLink">
      <img
        src={iconVector}
        alt="Vector Icon"
        className="BackLink__vector"
      />
      <button
        data-cy="backButton"
        className="BackLink__button"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
