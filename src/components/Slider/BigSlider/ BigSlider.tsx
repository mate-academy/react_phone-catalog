// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './BigSlider.scss';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function BigSlider() {
  return (
    <>
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
          <img src="../../../public/img/banner-phones.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../public/img/banner-accessories.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../public/img/banner-tablets.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
