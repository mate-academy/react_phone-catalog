import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainSlider.scss';
import { BASE_URL } from '../../api/api';

export const MainSlider: React.FC = () => {
  return (
    <div className="main-slider">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            src={`${BASE_URL}/_new/img/banner-phones.png`}
            alt="Main slider phones"
            className="main-slider__img"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src={`${BASE_URL}/_new/img/banner-tablets.png`}
            alt="Main slider tablets"
            className="main-slider__img"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src={`${BASE_URL}/_new/img/banner-accessories.png`}
            alt="Main slider accessories"
            className="main-slider__img"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
