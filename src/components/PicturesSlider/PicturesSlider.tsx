import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import classNames from 'classnames';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type SwiperCore from 'swiper';
import './PictureSlider.scss';

export const PicturesSlider = () => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="photoSwiper_container">
      <div
        className={classNames('icon_container', 'icon_container_left')}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <div className={classNames('icon', 'icon_left')} />
      </div>

      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onBeforeInit={swiper => {
          swiperRef.current = swiper;
        }}
        className="photoSwiper"
      >
        <SwiperSlide>
          <img
            src="\img\banner-accessories.png"
            alt="banner-accessorie"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img\banner-phones.png"
            alt="banner-phones"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img\banner-tablets.png"
            alt="banner-tablets"
          />
        </SwiperSlide>
      </Swiper>

      <div
        className={classNames('icon_container', 'icon_container_right')}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <div className={classNames('icon', 'icon_right')} />
      </div>
    </div>
  );
};
