import React from 'react';
import './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="notFoundPage">
      {/* <h2 className="notFoundPage__title">Page not found</h2> */}
      <img
        className="notFoundPage__image"
        src="img/notFoundPage/notFoundPage.png"
        alt="Page not found"
      />
    </div>
  );
};
