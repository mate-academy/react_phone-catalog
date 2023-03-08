import { Pagination, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';

import './BannerSlider.scss';

export const BannerSlider = () => {
  const slideImg = [
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/banner-accessories.png',
  ];

  return (
    <section className="banner-slider">
      <div className="main-container main-container--disable-on-mobile">
        <div className="banner-slider__content">
          <button
            type="button"
            className="banner-slider__button banner-slider__button--prev"
          >
            <img
              src="icons/arrow.svg"
              alt="prev button"
            />
          </button>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.banner-slider__pagination',
              clickable: true,
            }}
            navigation={{
              nextEl: '.banner-slider__button--next',
              prevEl: '.banner-slider__button--prev',
            }}
            modules={[Pagination, Navigation, Autoplay]}
          >
            {slideImg.map(img => (
              <SwiperSlide key={img}>
                <img
                  src={img}
                  alt="banner img"
                  className="banner-slider__image"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="banner-slider__button banner-slider__button--next"
          >
            <img
              src="icons/arrow.svg"
              alt="next button"
            />
          </button>
        </div>
      </div>

      <div className="banner-slider__pagination" />
    </section>

  );
};
