import React from 'react';
import { useHistory } from 'react-router-dom';

export const BackBtn = () => {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <button
      className="button-back"
      onClick={goBack}
    >
      Back
    </button>
  );
};
