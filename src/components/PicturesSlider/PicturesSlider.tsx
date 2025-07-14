import './PicturesSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const PicturesSlider = () => (
  <section className="slider-block">
    <h1 className="slider-block__text">Welcome to Nice Gadgets store!</h1>
    <div className="slider">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <div className="">
            <img
              className="slider__picture"
              src="/slider/image1.png"
              alt="iPhone 14"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="">
            <img
              className="slider__picture"
              src="/slider/image1.png"
              alt="iPhone 14"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="">
            <img
              className="slider__picture"
              src="/slider/image1.png"
              alt="iPhone 14"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
);
