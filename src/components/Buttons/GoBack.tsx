import React from 'react';
import { useHistory } from 'react-router-dom';
import './GoBack.scss';

export const GoBackButton = () => {
  const history = useHistory();

  return (
    <button
      type="button"
      className="backlink"
      onClick={() => history.goBack()}
    >
      Back
    </button>
  );
};
