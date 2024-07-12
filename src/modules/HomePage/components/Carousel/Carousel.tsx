import { Swiper, SwiperSlide } from 'swiper/react';
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules';

import { BANNER } from '../../constants/baner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import classes from './Carousel.module.scss';

export const Carousel = () => {
  return (
    <div className={classes.Carousel}>
      <Swiper
        className={classes.Carousel__container}
        modules={[A11y, Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        pagination-clickable="true"
        keyboard
      >
        {BANNER.map(image => (
          <SwiperSlide key={image.name} className={classes.Carousel__slide}>
            <img
              src={`img/${image.src}`}
              alt="Banner"
              className={classes.Carousel__img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
