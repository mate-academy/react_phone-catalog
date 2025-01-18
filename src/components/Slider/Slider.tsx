import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import { imagesForSlider } from '../../utils/imagesForSlider';
import { Link } from 'react-router-dom';

export const Slider = () => {
  return (
    <div className="slider__container swiper-one">
      <button className="slider__prev" id={'slidePrev'}></button>
      <button className="slider__next" id={'slideNext'}></button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCreative]}
        slidesPerView={1}
        navigation={{
          nextEl: '#slideNext',
          prevEl: '#slidePrev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        loop={true}
        effect="creative"
        creativeEffect={{
          prev: {
            opacity: 0,
            translate: ['-100%', 0, 0],
          },
          next: {
            opacity: 0,
            translate: ['100%', 0, 0],
          },
        }}
        autoplay={{ delay: 5000 }}
      >
        {imagesForSlider.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider__content">
              <div className="slider__info">
                <p className="slider__title">
                  {slide.title}
                  <span className="slider__icon">{slide.icon}</span>
                </p>
                <p className="slider__text">{slide.text}</p>
                <Link to={slide.link} className="slider__button">
                  Order now
                </Link>
              </div>
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="slider__img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="button-Atrrangment">
        <div className="button-swiper">
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};
