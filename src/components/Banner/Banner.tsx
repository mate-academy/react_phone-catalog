import React from 'react';
import './Banner.scss';

export const Banner: React.FC = () => {
  return (
    <div className="banner">
      <button className="banner__button">
        <img
          className="banner__arrow"
          src="/img/icons/arrow-left.svg"
          alt="arrow left"
        />
      </button>
      <div className="banner__wrapper">
        <img
          className="banner__image"
          src="/img/banner-desktop-1.jpg"
          alt="banner image"
        />
      </div>
      <button className="banner__button">
        <img
          className="banner__arrow"
          src="/img/icons/arrow-right.svg"
          alt="arrow right"
        />
      </button>
      {/* <div className="banner__container">
        <h1>Now available in our store!</h1>
        <p>Be the first!</p>
        <button>ORDER NOW</button>
      </div> */}
    </div>
  );
};
