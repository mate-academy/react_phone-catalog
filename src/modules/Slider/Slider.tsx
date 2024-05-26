/* eslint-disable import/no-extraneous-dependencies */
import { Pagination, Navigation } from 'swiper/modules';
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
import { useWindowDimensions } from '../../hooks/hooks';
import { TABLET_SIZE } from '../../consts/consts';
import { useRef } from 'react';

export const Slider = () => {
  const { width } = useWindowDimensions();
  const prevSliderBtn = useRef(null);
  const nextSliderBtn = useRef(null);
  const sliderPagination = useRef(null);

  return (
    <section className={style.slider}>
      <div className="container">
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={style.slider__container}>
        <div className={style.slider__wrapper}>
          {width > TABLET_SIZE ? (
            <button ref={prevSliderBtn} className={style.slider__button}>
              <img src={prevArrow} alt="Previous arrow" />
            </button>
          ) : (
            ''
          )}
          <Swiper
            modules={[Navigation, Pagination]}
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
              <img src={bannerAccessories} alt="Banner accessories" />
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
              <img src={bannerPhones} alt="Banner phones" />
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
              <img src={bannerTablets} alt="Banner tablets" />
            </SwiperSlide>
          </Swiper>
          {width > TABLET_SIZE ? (
            <button ref={nextSliderBtn} className={style.slider__button}>
              <img src={nextArrow} alt="Next arrow" />
            </button>
          ) : (
            ''
          )}
        </div>
        <div
          ref={sliderPagination}
          className={`${style.slider__pagination} slider__pagination`}
        ></div>
      </div>
    </section>
  );
};
