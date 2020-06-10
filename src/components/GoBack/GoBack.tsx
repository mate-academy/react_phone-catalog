import React from 'react';
import { useHistory } from 'react-router-dom';
import './GoBack.scss';

export const GoBack = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="GoBack">
      <span className="GoBack__Arrow" />
      <button
        className="GoBack__Button"
        type="button"
        onClick={handleClick}
      >
        Back
      </button>
    </div>
  );
};
