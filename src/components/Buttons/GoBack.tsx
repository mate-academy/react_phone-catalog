import React from 'react';
import { useHistory } from 'react-router-dom';
import './GoBack.scss';
import { useDispatch } from 'react-redux';
import { setError } from '../../store/error';

export const GoBackButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    history.goBack();
    dispatch(setError(''));
  };

  return (
    <button
      type="button"
      className="backlink"
      onClick={handleClick}
    >
      Back
    </button>
  );
};
