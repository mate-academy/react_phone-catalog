import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="BackButton">
      <img
        // eslint-disable-next-line global-require
        src={require('../../helpers/icons/icon_vector.svg')}
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
