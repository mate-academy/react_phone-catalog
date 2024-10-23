import React, { useMemo } from 'react';

import { Pagination, A11y, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './pagination.scss';
import { useWindowResize } from '../../useWindowSize';

export const HomeCarousel = () => {
  const [width] = useWindowResize();
  const allowTouchMove = useMemo(() => {
    return width < 640;
  }, [width]);
  const swiperKey = useMemo(() => `swiper-${width}`, [width]);

  return (
    <>
      <h1 className="carousel-home--text">Welcome to Nice Gadgets store!</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="carousel--slider">
          <img
            className="carousel--slider--first-button"
            src="./img/Buttons_Slider button - Default (right) (1).svg"
            alt="button"
          />
          <Swiper
            key={swiperKey}
            modules={[Pagination, A11y, Autoplay, Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 500000, disableOnInteraction: false }}
            centeredSlides={true}
            loop={true}
            navigation={{
              prevEl: '.carousel--slider--first-button',
              nextEl: '.carousel--slider--second-button',
            }}
            allowTouchMove={allowTouchMove}
            simulateTouch={allowTouchMove}
            touchStartPreventDefault={allowTouchMove}
          >
            <SwiperSlide>
              <img
                className="carousel--slider__first"
                src="./img/slider-first-photo.png"
                alt="Menu"
              />
              <img
                className="carousel--slider-banner"
                src="./img/slider-third-photo.jpg"
                alt="Menu"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="carousel--slider__second"
                src="./img/slider-second-photo.webp"
                alt="Menu"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="carousel--slider__third"
                src="./img/slider-third-photo.jpg"
                alt="Menu"
              />
            </SwiperSlide>
          </Swiper>
          <img
            className="carousel--slider--second-button"
            src="./img/Buttons_Slider button - Default (right) (2).svg"
            alt="button"
          />
        </div>
      </div>
    </>
  );
};
