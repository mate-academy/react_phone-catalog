import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './PicturesSlider.scss';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export const PicturesSlider = () => {
  return (
    <div className="pictures-slider-wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="./img/banner-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/banner-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/banner-3.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
