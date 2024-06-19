import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="favorites__empty">
      <img
        className="favorites__empty"
        src="img/product-not-found.png"
        alt="not-found"
      />
      <h1 className="favorites__title">Page was not founded</h1>
    </div>
  );
};
