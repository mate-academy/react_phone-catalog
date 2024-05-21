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

export const Slider = () => {
  const { width } = useWindowDimensions();

  return (
    <section className={style.slider}>
      <div className="container">
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={style.slider__container}>
        <div className={style.slider__wrapper}>
          {width > TABLET_SIZE ? (
            <button className={`${style.slider__button} slider__button--prev`}>
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
              nextEl: '.slider__button--next',
              prevEl: '.slider__button--prev',
            }}
            pagination={{ clickable: true, el: '.slider__pagination' }}
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
            <button className={`${style.slider__button} slider__button--next`}>
              <img src={nextArrow} alt="Next arrow" />
            </button>
          ) : (
            ''
          )}
        </div>
        <div className={`${style.slider__pagination} slider__pagination`}></div>
      </div>
    </section>
  );
};
