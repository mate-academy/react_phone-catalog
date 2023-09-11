import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

import './Banner.scss';

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

const navigationMode = true;

export const Banner = () => {
  return (
    <Swiper
      spaceBetween={30}
      navigation={navigationMode}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="Home-swiper"
    >
      <SwiperSlide className="Home-swiper__slide">
        <div
          className="
            Home-swiper__slide--image
            Home-swiper__slide--image-1"
        />
      </SwiperSlide>
      <SwiperSlide className="Home-swiper__slide">
        <div
          className="
            Home-swiper__slide--image
            Home-swiper__slide--image-2"
        />
      </SwiperSlide>
      <SwiperSlide className="Home-swiper__slide">
        <div
          className="
            Home-swiper__slide--image
            Home-swiper__slide--image-3"
        />
      </SwiperSlide>
    </Swiper>
  );
};
