import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import './BannerSlider.scss';
import '../buttons/ButtonStyles.scss';
import 'swiper/swiper-bundle.css';
import { useRef } from 'react';
import { Swiper as SwiperClass } from 'swiper';

export const BannerSlider = () => {
  const images = [
    './img/banners/accessories.png',
    './img/banners/iphone.png',
    './img/banners/ipad.png',
  ];

  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="carousel">
      <div className="carousel__content">
        <button
          type="button"
          className="carousel__button button left"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          {}
        </button>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          onSwiper={(swiper: SwiperClass) => {
            swiperRef.current = swiper;
          }}
        >
          {images.map(image => (
            <SwiperSlide key={image}>
              <img src={image} alt="banner" className="carousel__image" />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="carousel__button button right"
          onClick={() => swiperRef.current?.slideNext()}
        >
          {}
        </button>
      </div>
    </div>
  );
};
