import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">Not found page</h1>
      <img
        src="./public/img/page-not-found.png"
        alt="not-found-page"
        className="not-found-page__image"
      />
    </div>
  );
};
