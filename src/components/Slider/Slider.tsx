import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import './Slider.scss';

// eslint-disable-next-line
import NewAccessories from '../../assets/banners/banner-accessories-new.png';
import Iphones from '../../assets/banners/banner-iPhone-14-Colors.png';
import Ipads from '../../assets/banners/banner-Ipads.png';

// eslint-disable-next-line
import { ReactComponent as ArrowLeft } from '../../assets/icons/Chevron (Arrow Left).svg';
// eslint-disable-next-line
import { ReactComponent as ArrowRight } from '../../assets/icons/Chevron (Arrow Right).svg';

export const Slider: React.FC = () => {
  return (
    <div className="carousel">
      <div className="swiper-button-prev slider-arrow">
        <ArrowLeft className="slider-arrow-icon" />
      </div>

      <Swiper
        className="swiper-container"
        wrapperClass="wrapper"
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        speed={1500}
        loop
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
      >
        <SwiperSlide>
          <img className="slider-image" src={Iphones} alt="phones" />
        </SwiperSlide>

        <SwiperSlide>
          <img className="slider-image" src={Ipads} alt="tablets" />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="slider-image"
            src={NewAccessories}
            alt="accessories"
          />
        </SwiperSlide>

        <div className="swiper-pagination" />
      </Swiper>

      <div className="swiper-button-next slider-arrow">
        <ArrowRight className="slider-arrow-icon" />
      </div>
    </div>
  );
};
