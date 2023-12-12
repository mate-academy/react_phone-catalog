import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="Page-BackButton BackButton"
      type="button"
      onClick={() => navigate(-1)}
    >
      <span className="BackButton-Icon Icon Icon_arrow Icon_arrow_left" />
      Back
    </button>
  );
};
