import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import './SwiperSlider.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperSlider.scss';

const SwiperSlider = () => {
  const images = ['img/banners/4.svg', 'img/banners/1.png'];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <div className="slider__container">
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="slider__image" src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default SwiperSlider;
