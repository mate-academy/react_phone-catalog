import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="back">
      <span className="icon icon--arrow icon--prev" />

      <button
        type="submit"
        onClick={goBack}
        className="text text--small text--gray back__button"
        data-cy="backButton"
      >
        Back
      </button>
    </div>
  );
};
