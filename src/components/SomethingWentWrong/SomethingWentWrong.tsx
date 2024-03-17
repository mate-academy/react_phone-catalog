import React from 'react';
import { BASE_URL } from '../../helpers/constants';
import './SomethingWentWrong.scss';

export const SomethingWentWrong: React.FC = () => (
  <div className="something-went-wrong">
    <img
      src={`${BASE_URL}/img/page-not-found.png`}
      alt="something went wrong"
      className="something-went-wrong__image"
    />

    <h2 className="something-went-wrong__title">
      Something went wrong
    </h2>

    <button
      className="button something-went-wrong__button"
      type="button"
      aria-label="reload"
      onClick={() => window.location.reload()}
    >
      Reload
    </button>
  </div>
);
