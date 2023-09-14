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
      className="banner"
    >
      <SwiperSlide className="banner__slide">
        <div
          className="
            banner__slide--image
            banner__slide--image-1"
        />
      </SwiperSlide>
      <SwiperSlide className="banner__slide">
        <div
          className="
            banner__slide--image
            banner__slide--image-2"
        />
      </SwiperSlide>
      <SwiperSlide className="banner__slide">
        <div
          className="
            banner__slide--image
            banner__slide--image-3"
        />
      </SwiperSlide>
    </Swiper>
  );
};
