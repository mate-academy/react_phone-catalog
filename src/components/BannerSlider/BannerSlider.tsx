import React, { useMemo, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';

import { SliderBtn } from '../SliderBtn';

import './BannerSlider.scss';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';
import { API_URL } from '../../utils/api';

const photosPaths = [
  `${API_URL}/img/banner-phones.png`,
  `${API_URL}/img/banner-tablets.png`,
  `${API_URL}/img/banner-accessories.png`,
];

const TRANSITION_SPEED = 600;
const AUTOPLAY_DELAY = 5000;

export const BannerSlider: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  const swiperConfig = useMemo(
    () => ({
      modules: [Autoplay, EffectFade, Navigation, Pagination],
      onBeforeInit: (swiper: SwiperCore) => {
        swiperRef.current = swiper;
        swiperRef.current.params.speed = TRANSITION_SPEED;
      },
      navigation: {
        nextEl: '.BannerSlider__button--next',
        prevEl: '.BannerSlider__button--prev',
      },
      pagination: {
        el: '.BannerSlider__pagination',
        clickable: true,
        bulletClass: 'BannerSlider__paginationBtn',
        bulletActiveClass: 'BannerSlider__paginationBtn--active',
      },
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      effect: 'fade',
    }),
    [],
  );

  return (
    <section className="BannerSlider">
      <SliderBtn direction="prev" section="BannerSlider" />

      <Swiper {...swiperConfig} className="BannerSlider__swiper">
        {photosPaths.map((path, index) => (
          <SwiperSlide key={path} className="BannerSlider__slide">
            <img
              src={path}
              alt={`Slide ${index}`}
              className="BannerSlider__picture"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderBtn direction="next" section="BannerSlider" />

      <div className="BannerSlider__pagination">
        {photosPaths.map(path => (
          <span key={path.slice(1)} className="BannerSlider__paginationBtn" />
        ))}
      </div>
    </section>
  );
};
