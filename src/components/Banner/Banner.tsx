import React from 'react';
import styles from './Banner.module.scss';




export const Banner = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="banner__slider">
          <div className="banner__body">
            <div className="banner__arrowLeft">
              <img src="" alt="" className="bunner__icon" />
            </div>
            <img src="" alt="" className="banner__image" />
            <div className="banner__arrowRight">
              <img src="" alt="" className="bunner__icon" />
            </div>
          </div>
          <div className="banner__pagination"></div>
        </div>
      </div>
    </section>
  );
};
