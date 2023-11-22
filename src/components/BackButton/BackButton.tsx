/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';
import './backButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="button-back"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      <img
        src="new/img/icons/arrow-left.svg"
        alt="arrow-back"
        className="button-back-img"
      />
      <span className="button-back-text">
        Back
      </span>
    </button>
  );
};
