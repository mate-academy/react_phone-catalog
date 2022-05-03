import React from 'react';
import { useHistory } from 'react-router-dom';
import './Back.scss';

export const Back = () => {
  const history = useHistory();

  return (
    <div className="Back ProductDetails-Back">
      <img
        src="./img/icons/arrow-left-inactive.svg"
        alt="arrow-left"
        className="Back-Arrow"
      />

      <button
        data-cy="backButton"
        className="Back-Button"
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
    </div>
  );
};
