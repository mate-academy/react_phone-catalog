/* eslint-disable */
import React, { memo } from 'react';
import { ReactSVG } from 'react-svg';
import './BackButton.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export const BackButton: React.FC = memo(() => {
  const navigate = useNavigate();
  const { state } = useLocation();

  function goBack() {
    navigate({ pathname: '..', search: state.search })
  }

  return (
    <div className="back">
      <button
        type="button"
        className="back__button"
        aria-label="back-button"
        id="back-button"
        onClick={goBack}
      >
        <ReactSVG
          src="img/icons/Chevron (Arrow Left).svg"
        />
      </button>

      <label
        htmlFor="back-button"
        className="back__label"
      >
        Back
      </label>
    </div>
  );
});
