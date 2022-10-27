/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const history = useNavigate();

  return (
    <>
      <div
        className="BackButton"
        data-cy="backButton"
        onClick={() => history(-1)}
      >
        <i className="icon icon--arrowLeftBlack" />
        <p className="BackButton__text">
          Back
        </p>
      </div>
    </>
  );
};
