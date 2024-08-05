import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      data-cy="backButton"
      className="BackButton"
      onClick={handleClick}
    >
      Back
    </button>
  );
};
