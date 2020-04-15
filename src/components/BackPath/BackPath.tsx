import React, { FC } from 'react';
import './_BackPath.scss';
import arrow from '../../assets/back-arrow.svg';

export const BackPath: FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="back">
      <img src={arrow} alt="arrow-img" className="back__arrow" />
      <button
        className="back__btn"
        type="button"
        onClick={handleBack}
      >
        Back
      </button>
    </div>
  );
};
