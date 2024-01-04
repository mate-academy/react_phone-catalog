import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-2)}
      className="back-button text text--gray text--small"
    >
      <span className="icon icon--arrow icon--back" />
      Back
    </button>
  );
};
