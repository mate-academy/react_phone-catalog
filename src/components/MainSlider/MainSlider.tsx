/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BASE_URL } from '../../api/api';

import './MainSlider.scss';

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
