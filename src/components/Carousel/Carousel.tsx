import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, EffectFade, Pagination, Autoplay,
} from 'swiper';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import './Carousel.scss';

const images = [
  '_new/img/banner-phones.png',
  '_new/img/banner-tablets.png',
  '_new/img/banner-accessories.png',
];
const URL = 'https://mate-academy.github.io/react_phone-catalog/';

export const Carousel: React.FC = () => {
  return (
    <section className="carousel">
      <div className="container">
        <div className="carousel__content">
          <button
            className="carousel__button carousel__button--prev"
            type="button"
          >
            &lt;
          </button>
          <Swiper
            navigation={{
              nextEl: '.carousel__button--next',
              prevEl: '.carousel__button--prev',
            }}
            effect="fade"
            pagination={{ clickable: true }}
            slidesPerView={1}
            autoplay={{ delay: 500 }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide
                className="swiper-slider"
                key={image}
              >
                <img
                  className="carousel__img"
                  src={`${URL}${image}`}
                  alt={`${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="carousel__button carousel__button--next"
            type="button"
            data-cy="next"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};
