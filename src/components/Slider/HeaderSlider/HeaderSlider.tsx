import React from 'react';
import Slider, { Settings } from 'react-slick';
import MediaQuery from 'react-responsive';

import './HeaderSlider.scss';
import { SCREEN_SIZES } from '../../../styles/utils/icons/screenSizes';

export const HeaderSlider: React.FC = () => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    adaptiveHeight: true,
    className: 'banner__slider',
  };

  return (
    <>
      <MediaQuery maxWidth={SCREEN_SIZES.mobileMax}>
        <Slider {...sliderSettings}>
          <div className="slider-slide">
            <div className="slide-image">
              <img
                src="/img/bannerIphoneMobile.png"
                className="slide-image--img"
                alt="iPhone 14 Pro"
              />
            </div>
          </div>
          <div className="slider-slide">
            <div className="slide-image">
              <img
                src="/img/bannerTabletMobile.png"
                className="slide-image--img"
                alt="iPad Pro 11"
              />
            </div>
          </div>
          <div className="slider-slide">
            <div className="slide-image">
              <img
                src="/img/bannerWatchMobile.png"
                className="slide-image--img"
                alt="Apple Watch Ultra"
              />
            </div>
          </div>
        </Slider>
      </MediaQuery>

      <MediaQuery minWidth={SCREEN_SIZES.tabletMin}>
        <Slider {...sliderSettings} arrows>
          <div className="slider-slide">
            <div className="slide-image">
              <img src="/img/bannerIphoneDesktop.png" alt="iPhone 14 Pro" />
            </div>
          </div>
          <div className="slider-slide">
            <div className="slide-image">
              <img src="/img/bannerTabletDesktop.png" alt="iPad Pro 11" />
            </div>
          </div>
          <div className="slider-slide">
            <div className="slide-image">
              <img src="/img/bannerWatchDesktop.png" alt="Apple Watch Ultra" />
            </div>
          </div>
        </Slider>
      </MediaQuery>
    </>
  );
};
