import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import PS from './PictureSlider.module.scss';
import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PictureSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const images = [
    { id: 1, link: './img/my/slider/img_1.jpg', className: PS.slider__picture },
    { id: 2, link: './img/my/slider/img_2.jpg', className: PS.slider__picture },
    { id: 3, link: './img/my/slider/img_3.jpg', className: PS.slider__picture },
    { id: 4, link: './img/my/slider/img_4.jpg', className: PS.slider__picture },
    //{ id: 5, link: '/img/my/slider/img_5.jpg', className: PS.slider__picture },
    //{ id: 6, link: '/img/my/slider/img_6.jpg', className: PS.slider__picture },
    //{ id: 7, link: './img/my/slider/img_7.jpg', className: PS.slider__picture },
    { id: 8, link: './img/my/slider/img_8.png', className: PS.slider__picture },
  ];

  return (
    <div className={PS.allSliderBloc}>
      <div className={PS.slider}>
        <div className={PS.slider__viewport}>
          <button
            type="button"
            className={cn(PS.slider__button, PS.slider__button__left)}
            onClick={() => swiperRef.current?.slidePrev()}
          ></button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            speed={1000}
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
            className={PS.slider__swiper}
          >
            {images.map(({ id, link, className }) => (
              <SwiperSlide key={id} className={PS.slide}>
                <div className={PS.slide__inner}>
                  <img src={link} alt="" className={cn(PS.image, className)} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className={cn(PS.slider__button, PS.slider__button__right)}
            onClick={() => swiperRef.current?.slideNext()}
          ></button>
        </div>
      </div>
      <div className={PS.pagination}>
        {images.map((_, i) => (
          <button
            key={i}
            className={cn(PS.pagination__point, {
              [PS.pagination__point__active]: activeIndex === i,
            })}
            onClick={() => swiperRef.current?.slideToLoop(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};
