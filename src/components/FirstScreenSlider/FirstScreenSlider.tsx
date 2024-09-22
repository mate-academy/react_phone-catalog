import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import { Link } from 'react-router-dom';

export const FirstScreenSlider: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.params.autoplay.enabled =
        !swiperRef.current.swiper.params.autoplay.enabled;
    }
  };

  return (
    <div className="first-screen__slider-container">
      <Swiper
        ref={swiperRef}
        className="first-screen__slider"
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '.first-screen__prev-btn',
          nextEl: '.first-screen__next-btn',
        }}
        pagination={{
          el: '.first-screen__dots',
          clickable: true,
          bulletClass: 'first-screen__bullet',
          bulletActiveClass: '_active',
        }}
        onSlideChangeTransitionStart={toggleAutoplay}
        onSlideChangeTransitionEnd={toggleAutoplay}
      >
        <SwiperSlide className="first-screen__slide">
          <Link to={'phones/apple-iphone-14-pro-1tb-gold'}>
            <picture>
              <source
                srcSet="/img/first-slider/first-slider-img-desktop.jpg"
                media="(min-width: 1200px)"
              />
              <source
                srcSet="/img/first-slider/first-slider-img-tablet.jpg"
                media="(min-width: 640px)"
              />
              <img
                src="/img/first-slider/first-slider-img-mobile.jpg"
                alt="main-benefit"
                className="first-screen__slide-image"
              />
            </picture>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="first-screen__slide">
          <Link to={'/phones/apple-iphone-14-pro-1tb-gold'}>
            <picture>
              <source
                srcSet="/img/first-slider/first-slider-img-desktop.jpg"
                media="(min-width: 1200px)"
              />
              <source
                srcSet="/img/first-slider/first-slider-img-tablet.jpg"
                media="(min-width: 640px)"
              />
              <img
                src="/img/first-slider/first-slider-img-mobile.jpg"
                alt="main-benefit"
                className="first-screen__slide-image"
              />
            </picture>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="first-screen__slide">
          <Link to={'/phones/apple-iphone-14-pro-1tb-gold'}>
            <picture>
              <source
                srcSet="/img/first-slider/first-slider-img-desktop.jpg"
                media="(min-width: 1200px)"
              />
              <source
                srcSet="/img/first-slider/first-slider-img-tablet.jpg"
                media="(min-width: 640px)"
              />
              <img
                src="/img/first-slider/first-slider-img-mobile.jpg"
                alt="main-benefit"
                className="first-screen__slide-image"
              />
            </picture>
          </Link>
        </SwiperSlide>
      </Swiper>
      <button
        className="
        first-screen__prev-btn first-screen__btn arrow-btn"
      ></button>
      <button
        className="
        first-screen__next-btn first-screen__btn arrow-btn"
      ></button>
      <div className="first-screen__dots"></div>
    </div>
  );
};
