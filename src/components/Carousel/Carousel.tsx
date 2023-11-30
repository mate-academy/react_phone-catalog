import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import './Carousel.scss';

const images = [
  './_new/img/banner-phones.png',
  './_new/img/banner-tablets.png',
  './_new/img/banner-accessories.png',
];

export const Carousel: React.FC = () => {
  return (
    <div className="carousel">
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
        // spaceBetween={50}
        slidesPerView={1}
        // breakpoints={{
        //   640: {
        //     slidesPerView: 2,
        //   },
        //   900: {
        //     slidesPerView: 3,
        //   },
        //   1280: {
        //     slidesPerView: 4,
        //   },
        // }}
        modules={[EffectFade, Navigation, Pagination]}
        className="swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide
            className="swiper-slider"
            key={image}
          >
            <img
              className="carousel__img"
              src={image}
              alt={`${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <ul
        className="Carousel__list"
        style={{
          width: '1040px',
        }}
      >
        {images.map((image, index) => (
          <li
            style={{
              transform: `translateX(-${activePage * 1040}px)`,
              // transition: `transform ${animationDuration}ms`,
            }}
            key={image}
          >
            <img
              className="Carousel__img"
              style={{
                width: '1040px',
              }}
              src={image}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul> */}
      <button
        className="carousel__button carousel__button--next"
        type="button"
        data-cy="next"
      >
        &gt;
      </button>
    </div>
  );
};
