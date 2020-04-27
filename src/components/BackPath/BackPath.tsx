import React, { FC } from 'react';
import './_BackPath.scss';
import arrow from '../../assets/back-arrow.svg';

export const BackPath: FC = () => (
  <div className="back">
    <img src={arrow} alt="arrow-img" className="back__arrow" />
    <button
      className="back__btn"
      type="button"
      onClick={() => window.history.back()}
    >
      Back
    </button>
  </div>
);
