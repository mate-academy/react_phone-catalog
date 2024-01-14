/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable global-require */
import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import './Carousel.scss';

const images = [
  require('../../assets/banners/banner-phones.png'),
  require('../../assets/banners/banner-tablets.png'),
  require('../../assets/banners/banner-accessories.png'),
];

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      type="button"
      className="carousel__button carousel__button--left"
      aria-label="next"
    >
      <div className="icon icon-next" />
    </button>
  );
};

const NextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      type="button"
      className="carousel__button carousel__button--right"
      aria-label="prev"
    >
      <div className="icon icon-prev" />
    </button>
  );
};

export const Carousel: React.FC = () => {
  return (
    <section className="carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        pagination
        navigation
        loop
        className="swiper"
        allowTouchMove={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <PrevButton />
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <img src={image} alt={`Image ${index + 1}`} className="swiper__image image" />
          </SwiperSlide>
        ))}

        <NextButton />
      </Swiper>
    </section>
  );
};
