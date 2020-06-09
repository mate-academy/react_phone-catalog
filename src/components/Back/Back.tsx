import React from 'react';
import { useHistory } from 'react-router-dom';


export const Back = () => {
  const history = useHistory();

  return (
    <div className="go-back">
      <span className="go-back__arrow"></span>
      <button
        className="go-back__btn"
        type="button"
        onClick={() => {
          history.goBack()}}
      >
        Back
      </button>
    </div>
  )
}
