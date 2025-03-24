import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

const images = [
  {
    mobile: '/img/banner/hero_iphone16pro_small.jpg',
    tablet: '/img/banner/hero_iphone16pro_medium.jpg',
    desktop: '/img/banner/hero_iphone16pro_large.jpg',
  },
  {
    mobile: '/img/banner/hero_ipadpro_small-v3.webp',
    tablet: '/img/banner/hero_ipadpro_large.jpg',
    desktop: '/img/banner/hero_ipadpro_large.jpg',
  },
  {
    mobile: '/img/banner/hero_watchultra2_small.jpg',
    tablet: '/img/banner/hero_watchultra2_large-v2.webp',
    desktop: '/img/banner/hero_watchultra2_large-v2.webp',
  },
];

export const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setCurrentIndex(swiperRef.current.realIndex);
    }
  };

  return (
    <div className="container">
      <div className="banner">
        <h2 className="banner__title">Welcome to Nice Gadgets store!</h2>
        <div className="banner__slider">
          <button
            className="banner__slider__btn banner__slider__btn--prev"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <img
              className="banner__slider__btn--img"
              src="/img/banner/banner_button-prev.svg"
              alt="Previous"
            />
          </button>
          <Swiper
            className="banner__slider__list"
            slidesPerView={1}
            speed={1000}
            navigation={{
              prevEl: '.banner__slider__btn--prev',
              nextEl: '.banner__slider__btn--next',
            }}
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={0}
            breakpoints={{
              640: {
                spaceBetween: 19,
              },
              1200: {
                spaceBetween: 16,
              },
            }}
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <picture className="banner__slider__list--card">
                  <source media="(min-width: 640px)" srcSet={image.tablet} />
                  <source media="(min-width: 1440px)" srcSet={image.desktop} />
                  <img
                    className="banner__slider__img"
                    src={image.mobile}
                    alt={`Slide ${index}`}
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="banner__slider__btn banner__slider__btn--next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <img
              className="banner__slider__btn--img"
              src="/img/banner/banner_button-next.svg"
              alt="Next"
            />
          </button>
        </div>
        <div className="banner__dashes">
          {images.map((_, index) => (
            <span
              key={index}
              className={`banner__dash ${index === currentIndex ? 'active' : ''}`}
              onClick={() => swiperRef.current?.slideTo(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
