import React from 'react';
import './NotFound.scss';

export const NotFound: React.FC = () => {
  return (
    <div className="notFound">
      <img
        className="notFound__img"
        src={`${process.env.PUBLIC_URL}/img/product-not-found.png`}
        alt="notFound"
      />
      <p className="notFound__title">Page not found</p>
    </div>
  );
};
