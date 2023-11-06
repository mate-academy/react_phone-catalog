import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const history = useNavigate();

  return (
    <div
      className="BackButton"
      data-cy="backButton"
      onClick={() => history(-1)}
      role="button"
      tabIndex={0}
      aria-hidden="true"
    >
      <i className="icon icon--arrowLeftBlack" />
      <p className="BackButton__text">
        Back
      </p>
    </div>
  );
};
