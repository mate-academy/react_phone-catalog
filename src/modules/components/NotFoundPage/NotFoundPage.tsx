import React from 'react';
import './NotFoundPage.scss';
import pageNotFounded from '../../../global-assets/images/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <img
        className="not-found-page__image"
        src={pageNotFounded}
        alt="page not found"
      />
    </div>
  );
};
