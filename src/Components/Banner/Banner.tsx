import React, { useState } from 'react';

import './Banner.scss';
import classNames from 'classnames';

export const Banner: React.FC = () => {
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <div className="banner container">
      <div className="banner__content">
        <button
          type="button"
          className="banner__button banner__button--left"
          onClick={() => {
            if (activeBanner === 0) {
              setActiveBanner(2);
            } else {
              setActiveBanner(activeBanner - 1);
            }
          }}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <div className="banner__image">
          <img
            src="./img/banner/1.png"
            alt=""
            className={classNames('banner__img', { 'banner__img--active': activeBanner === 0 })}
          />
          <img
            src="./img/banner/2.jpg"
            alt=""
            className={classNames('banner__img', { 'banner__img--active': activeBanner === 1 })}
          />
          <img
            src="./img/banner/3.jpg"
            alt=""
            className={classNames('banner__img', { 'banner__img--active': activeBanner === 2 })}
          />
        </div>
        <button
          type="button"
          className="banner__button banner__button--right"
          onClick={() => {
            if (activeBanner === 2) {
              setActiveBanner(0);
            } else {
              setActiveBanner(activeBanner + 1);
            }
          }}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
      <div className="banner__pagination">
        <button
          type="button"
          className={classNames('banner__pagination-item', { 'banner__pagination-item--active': activeBanner === 0 })}
          onClick={() => setActiveBanner(0)}
        >
          {}
        </button>
        <button
          type="button"
          className={classNames('banner__pagination-item', { 'banner__pagination-item--active': activeBanner === 1 })}
          onClick={() => setActiveBanner(1)}
        >
          {}
        </button>
        <button
          type="button"
          className={classNames('banner__pagination-item', { 'banner__pagination-item--active': activeBanner === 2 })}
          onClick={() => setActiveBanner(2)}
        >
          {}
        </button>
      </div>
    </div>
  );
};
