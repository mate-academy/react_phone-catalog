/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';

import './notFoundPage.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfoundpage">
      <div className="container">
        <div
          className="notfoundpage__button-back"
          data-cy="backButton"
          onClick={() => navigate(-1)}
        >
          <img
            src="new/img/icons/arrow-left.svg"
            alt="arrow-back"
            className="notfoundpage__button-back-img"
          />
          <span className="notfoundpage__button-back-text">
            Back
          </span>
        </div>
        <p className="notfoundpage__content">
          Page not found
        </p>
      </div>
    </div>
  );
};
