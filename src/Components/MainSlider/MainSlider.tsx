import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
import { ButtonArrow } from '../../ui/ButtonArrow/ButtonArrow';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import 'swiper/css';
// @ts-expect-error
import 'swiper/css/pagination';
// @ts-expect-error
import 'swiper/css/navigation';
/* eslint-enable @typescript-eslint/ban-ts-comment */

import './MainSlider.scss';
import { useThemeState } from '../../stateManagers/themeState';

export const MainSlider = () => {
  const { theme } = useThemeState();

  const slides = [
    {
      imagePath: '/img/banner-phones-transparent.png',
      imageTitle: 'banner-phones',
      link: '/phones',
    },
    {
      imagePath: '/img/banner-tablets-transparent.png',
      imageTitle: 'banner-tablets',
      link: '/tablets',
    },
    {
      imagePath: '/img/banner-accessories-transparent.png',
      imageTitle: 'banner-accessories',
      link: '/accessories',
    },
  ];

  return (
    <div className={`banner-slider banner-slider-${theme}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.banner-slider__button--next',
          prevEl: '.banner-slider__button--prev',
        }}
        pagination={{
          el: '.banner-slider__pagination',
          clickable: true,
        }}
        className="banner-slider__swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="banner-slider__slide"
          >
            <NavLink
              to={slide.link}
              className="banner-slider__image-container"
            >
              <img
                src={slide.imagePath}
                alt={slide.imageTitle}
                className="banner-slider__image"
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>

      <ButtonArrow
        icon="arrow"
        direction="left"
        className="banner-slider__button banner-slider__button--prev"
        aria-label="Previous"
      />

      <ButtonArrow
        icon="arrow"
        direction="right"
        className="banner-slider__button banner-slider__button--next"
        aria-label="Next"
      />

      <div className="banner-slider__pagination"></div>
    </div>
  );
};
