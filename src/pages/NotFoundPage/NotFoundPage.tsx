import React from 'react';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found__wrapper">
      <img
        src="/img/page-not-found.png"
        alt="not found image"
        className="not-found__image"
      />
    </div>
  );
};
