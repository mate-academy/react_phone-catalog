import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import './Carousel.scss';

import Phones from './assets/banner-phones.png';
import Tablets from './assets/banner-tablets.png';
import Accessories from './assets/banner-accessories.png';
import NewAccessories from './assets/banner-accessories-new.png';
import Iphones from './assets/banner-iPhone-14-Colors.png';
import Ipads from './assets/banner-Ipads.png';

import { ReactComponent as ArrowLeft }
  from '../../icons/Chevron (Arrow Left).svg';
import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';

const Carousel: React.FC = () => {
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
          <img className="slider-image" src={Accessories} alt="accessories" />
        </SwiperSlide>

        <SwiperSlide>
          <img className="slider-image" src={Phones} alt="phones" />
        </SwiperSlide>

        <SwiperSlide>
          <img className="slider-image" src={Tablets} alt="tablets" />
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

export default Carousel;
