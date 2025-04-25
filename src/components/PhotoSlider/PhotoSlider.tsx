import { Swiper, SwiperSlide } from 'swiper/react';
import './PhotoSliderStyles.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export function MySlider() {
  return (
    <>
      <div className="sliderWrapper">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="slider"
        >
          <SwiperSlide>
            <img src="/img/BannerSlide2.svg" alt="1" className="slide_Image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/banner-tablets.png" alt="2" className="slide_Image firstSlide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/category-accessories.png" alt="3" className="slide_Image secondSlide" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
