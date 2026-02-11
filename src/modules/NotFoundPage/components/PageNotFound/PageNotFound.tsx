import React from 'react';

export const PageNotFound: React.FC = () => {
  return (
    <div className="container pageNotFound">
      <h1 className="pageNotFound__title">Page not found</h1>
      <img
        src="/public/img/page-not-found.png"
        alt="Page not found image"
        className="pageNotFound__photo"
      />
    </div>
  );
};
