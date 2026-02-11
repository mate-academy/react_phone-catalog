import cn from 'classnames';
import commertials from './Commertials.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';
import { useState, useRef } from 'react';

export const Commertials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const slides = [
    {
      id: 1,
      className: commertials.content__commertial__1,
      link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
    },
    {
      id: 2,
      className: commertials.content__commertial__2,
      link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
    },
    {
      id: 3,
      className: commertials.content__commertial__3,
      link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
    },
  ];

  return (
    <div className={cn(commertials.commertials__content, commertials.content)}>
      <div className={commertials.content__top}>
        <button
          className={cn(
            commertials.content__button,
            commertials.content__button__left,
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        ></button>
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={swiper => (swiperRef.current = swiper)}
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          slidesPerView="auto"
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className={commertials.content__swiper}
        >
          {slides.map(slide => (
            <SwiperSlide
              key={slide.id}
              className={commertials.content__swiperSlide}
            >
              <Link
                to={slide.link}
                className={cn(commertials.content__commertial, slide.className)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={cn(
            commertials.content__button,
            commertials.content__button__right,
          )}
          onClick={() => swiperRef.current?.slideNext()}
        ></button>
      </div>
      <div className={commertials.content__bottom}>
        <div className={commertials.content__pagination}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={cn(commertials.content__bullet, {
                [commertials['content__bullet--active']]: i === activeIndex,
              })}
              onClick={() => swiperRef.current?.slideToLoop(i)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};
