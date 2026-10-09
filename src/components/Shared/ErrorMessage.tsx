import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/ItemProvider';

export const ErrorMessage: React.FC = () => {
  const { error } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (!error) {
    return null;
  }

  return (
    <div className="error-banner">
      <span className="error-banner__text">{error}</span>
      <button
        type="button"
        className="error-banner__close"
        onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
      >
        ✕
      </button>
    </div>
  );
};
