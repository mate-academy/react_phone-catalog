/* eslint-disable import/no-extraneous-dependencies */
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './../../styles/libs/_swiper.scss';
import bannerAccessories from './../../images/banner/banner-accessories.png';
import bannerPhones from './../../images/banner/banner-phones.png';
import bannerTablets from './../../images/banner/banner-tablets.png';
import style from './Slider.module.scss';
import prevArrow from './../../images/icons/prev_icon.svg';
import nextArrow from './../../images/icons/next_icon.svg';
import { useRef } from 'react';
import { NavigationOptions, PaginationOptions } from 'swiper/types';

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
            observeParents={true}
            observer={true}
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
            onInit={swiper => {
              const navigation = swiper.params.navigation as
                | NavigationOptions
                | undefined;

              if (navigation) {
                navigation.prevEl = prevSliderBtn.current;
                navigation.nextEl = nextSliderBtn.current;
              }

              const pagination = swiper.params.pagination as
                | PaginationOptions
                | undefined;

              if (pagination) {
                pagination.el = sliderPagination.current;
              }

              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            <SwiperSlide className={style.slide}>
              <img src={bannerAccessories} alt="Banner accessories" />
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
              <img src={bannerPhones} alt="Banner phones" />
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
              <img src={bannerTablets} alt="Banner tablets" />
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
