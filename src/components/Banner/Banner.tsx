import React from 'react';

import Slider from 'react-slick';
import { NextArrow } from '../ProductsSlider/NextArrow';
import { PrevArrow } from '../ProductsSlider/PrevArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Banner1 from '../../images/banner1.jpg';
import Banner2 from '../../images/banner2.jpeg';
import Banner3 from '../../images/banner3.jpeg';

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
          <img src={Banner1} alt="" />
          <img src={Banner2} alt="" />
          <img src={Banner3} alt="" />
        </Slider>
      </div>
    </div>
  );
};
