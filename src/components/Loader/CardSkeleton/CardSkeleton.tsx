import React from 'react';

export const CardSkeleton = () => (
  <div className="card-skeleton">
    <div className="card-skeleton__image-container">
      <div className="skeleton card-skeleton__image" />
    </div>
    <div className="skeleton card-skeleton__name" />

    <div className="card-skeleton__price-block">
      <div className="skeleton card-skeleton__price" />
      <div className="skeleton card-skeleton__price" />
    </div>

    <div className="card-skeleton__tech-block">
      <div className="card-skeleton__tech-container">
        <div className="skeleton card-skeleton__tech" />
        <div className="skeleton card-skeleton__tech" />
      </div>

      <div className="card-skeleton__tech-container">
        <div className="skeleton card-skeleton__tech" />
        <div className="skeleton card-skeleton__tech" />
      </div>

      <div className="card-skeleton__tech-container">
        <div className="skeleton card-skeleton__tech" />
        <div className="skeleton card-skeleton__tech" />
      </div>
    </div>

    <div className="card-skeleton__buttons-block">
      <div className="skeleton card-skeleton__button-cart" />
      <div className="skeleton card-skeleton__button-fav" />
    </div>
  </div>
);
