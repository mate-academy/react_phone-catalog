import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import style from './carusel.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export const Carusel = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};
