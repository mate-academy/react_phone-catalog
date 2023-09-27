import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import './BannerSlider.scss';
import './BannerSwiper.scss';

import bannerAccessories from '../../assets/img/banner-accessories.png';
import bannerPhones from '../../assets/img/banner-phones.png';
import bannerTablets from '../../assets/img/banner-tablets.png';

import {
  ReactComponent as ArrowLeft,
} from '../../assets/icons/Chevron(ArrowLeft).svg';
import {
  ReactComponent as ArrowRight,
} from '../../assets/icons/Chevron(ArrowRight).svg';

export const BannerSlider: React.FC = () => {
  return (
    <div className="banner">
      <div className="swiper-button-prev button-nav">
        <ArrowLeft />
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        loop
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        wrapperClass="swiper-banner-wrapper"
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <img
            src={bannerAccessories}
            alt="Banner Accessories"
            className="banner__img"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={bannerPhones}
            alt="Banner Phones"
            className="banner__img"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={bannerTablets}
            alt="Banner Tablets"
            className="banner__img"
          />
        </SwiperSlide>

        <div className="swiper-pagination" />
      </Swiper>

      <div className="swiper-button-next button-nav">
        <ArrowRight />
      </div>
    </div>
  );
};
