import React from 'react';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="page-not-found">
      <h2 className="typography__h2">Page not found</h2>
      <img
        src="/img/page-not-found.png"
        alt="Page Not Found"
        className="page-not-found__image"
      />
    </div>
  );
};
