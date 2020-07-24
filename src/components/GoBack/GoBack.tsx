import React from 'react';
import { useHistory } from 'react-router-dom';
import './GoBack.scss';

const GoBack = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="GoBack">
      <span className="GoBack__arrow" />
      <button
        className="GoBack__button"
        type="button"
        onClick={handleClick}
      >
        Back
      </button>
    </div>
  );
};

export default GoBack;
