import React from 'react';

import Slider from 'react-slick';
import { NextArrow } from '../ProductsSlider/NextArrow';
import { PrevArrow } from '../ProductsSlider/PrevArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './banner.scss';

export const Banner: React.FC = () => {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner">
      <div className="container">
        <Slider
          {...sliderSettings}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          <img src="./img/Preview/preview1.jpg" alt="" />
          <img src="./img/Preview/preview2.jpeg" alt="" />
          <img src="./img/Preview/preview3.jpeg" alt="" />
        </Slider>
      </div>
    </div>
  );
};
