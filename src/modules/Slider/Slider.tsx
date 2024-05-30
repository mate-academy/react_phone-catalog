/* eslint-disable import/no-extraneous-dependencies */
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './../../styles/libs/_swiper.scss';
import bannerAccessories from './../../images/banner/dark_banner_3.jpg';
import bannerPhones from './../../images/banner/dark_banner_5.jpg';
import bannerTablets from './../../images/banner/dark_banner_6.jpg';
import style from './Slider.module.scss';
import prevArrow from './../../images/icons/prev_icon.svg';
import nextArrow from './../../images/icons/next_icon.svg';
import { useRef } from 'react';
// import { NavigationOptions, PaginationOptions } from 'swiper/types';

export const Slider = () => {
  const swiperRef = useRef(null);
  const prevSliderBtn = useRef<HTMLButtonElement | null>(null);
  const nextSliderBtn = useRef<HTMLButtonElement | null>(null);
  const sliderPagination = useRef(null);

  return (
    <section className={style.slider}>
      <div className="container">
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={style.slider__container}>
        <div className={style.slider__wrapper}>
          <button ref={prevSliderBtn} className={style.slider__button}>
            <img src={prevArrow} alt="Previous arrow" />
          </button>

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            loop={true}
            slidesPerView={1}
            navigation={{
              nextEl: nextSliderBtn.current,
              prevEl: prevSliderBtn.current,
            }}
            pagination={{ clickable: true, el: sliderPagination.current }}
          >
            <SwiperSlide className={style.slide}>
              <img
                src={bannerAccessories}
                alt="Banner accessories"
                loading="lazy"
              />
              <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
              <img src={bannerPhones} alt="Banner phones" loading="lazy" />
              <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
              <img src={bannerTablets} alt="Banner tablets" loading="lazy" />
              <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>
          </Swiper>

          <button ref={nextSliderBtn} className={style.slider__button}>
            <img src={nextArrow} alt="Next arrow" />
          </button>
        </div>
        <div
          ref={sliderPagination}
          className={`${style.slider__pagination} slider__pagination`}
        ></div>
      </div>
    </section>
  );
};
