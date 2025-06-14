import React from 'react';
import styles from './Banner.module.scss';
import bannerImg from './../../images/img/main-banner.jpg';
import arrowIcon from './../../images/icons/arrow-up.svg';

const {
  banner,
  banner__slider,
  banner__body,
  banner__pagination,
  banner__pagination_item,
  banner__pagination_active,
  banner__icon,
  banner__icon_left,
  banner__icon_right,
  banner__image,
  banner__button,
} = styles;

export const Banner = () => {
  return (
    <section className={banner}>
      <div className="container">
        <div className={banner__slider}>
          <div className={banner__body}>
            <button className={banner__button}>
              <img
                src={arrowIcon}
                alt=""
                className={`${banner__icon} ${banner__icon_left} `}
              />
            </button>
            <img src={bannerImg} alt="" className={banner__image} />
            <button className={banner__button}>
              <img
                src={arrowIcon}
                alt=""
                className={`${banner__icon} ${banner__icon_right} `}
              />
            </button>
          </div>
          <div className={banner__pagination}>
            <div
              className={`${banner__pagination_item} ${banner__pagination_active} `}
            >
              <span></span>
            </div>
            <div className={banner__pagination_item}>
              <span></span>
            </div>
            <div className={banner__pagination_item}>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
