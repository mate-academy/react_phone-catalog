import React from 'react';
import { useHistory } from 'react-router-dom';
import './ButtonBack.scss';

const ButtonBack = () => {
  const history = useHistory();

  return (
    <button
      type="button"
      className="button-back"
      onClick={() => history.goBack()}
    >
      <div className="button-back__content-wrapper">
        <span
          className="button-back__icon"
        >
          <img
            src="./img/icons/MainContent/arrow-left.svg"
            alt="arrow-left"
            className="button-back__img"
          />
        </span>
        <span
          className="button-back__text"
        >
          Back
        </span>
      </div>
    </button>
  );
};

export default ButtonBack;
