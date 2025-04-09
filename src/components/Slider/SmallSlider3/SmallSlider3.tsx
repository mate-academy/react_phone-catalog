// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './SmallSlider3.scss';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function SmallSlider3() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
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
