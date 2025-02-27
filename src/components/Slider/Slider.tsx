import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
} from 'swiper/modules';

import './Slider.scss';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { imagesForSlider } from '../../utils/imagesForSlider';

export const Slider = () => {
  return (
    <section className="slider">
      <div className="slider__button swiper-button-prev-out">&lt;</div>
      <Swiper
        modules={[
          EffectCoverflow,
          Navigation,
          Pagination,
          Autoplay,
          Mousewheel,
        ]}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next-out',
          prevEl: '.swiper-button-prev-out',
        }}
        pagination={{ clickable: true }}
        mousewheel={{ forceToAxis: true }}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect={'coverflow'}
        className="slider__swiper"
      >
        {imagesForSlider.map((image, index) => {
          return (
            <SwiperSlide className="slider__slide" key={index}>
              <div className="slider__wrapper">
                <p className="slider__text">{image.text}</p>
                <Link to={image.link} className="slider__order">
                  order now
                </Link>
              </div>
              <div
                className="slider__img"
                style={{ backgroundImage: `url(${image.src})` }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="slider__button swiper-button-next-out">&gt;</div>
    </section>
  );
};
