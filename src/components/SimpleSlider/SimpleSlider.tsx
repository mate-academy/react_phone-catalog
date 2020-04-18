import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SimpleSlider.css';

export const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    cssEase: 'linear',
  };

  return (
    <div className="slider__container">
      <Slider {...settings}>
        <div>
          <img
            className="slider__image"
            src="./img/Banner.jpg"
            alt="slider_img"
          />
        </div>
        <div>
          <img
            className="slider__image"
            src="./img/slider_image2.jpg"
            alt="slider_img"
          />
        </div>
        <div>
          <img
            className="slider__image"
            src="./img/slider_image3.jpg"
            alt="slider_img"
          />
        </div>
        <div>
          <img
            className="slider__image"
            src="./img/slider_image4.jpg"
            alt="slider_img"
          />
        </div>
        <div>
          <img
            className="slider__image"
            src="./img/slider_image5.jpg"
            alt="slider_img"
          />
        </div>
        <div>
          <img
            className="slider__image"
            src="./img/slider_image6.png"
            alt="slider_img"
          />
        </div>
      </Slider>
    </div>
  );
};
