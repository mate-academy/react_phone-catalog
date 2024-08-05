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
import { Slide } from './Slide/Slide';

export const Slider = () => {
  const images = [
    {
      image: bannerPhones,
      alt: 'Banner accessories',
    },
    {
      image: bannerAccessories,
      alt: 'Banner phones',
    },
    {
      image: bannerTablets,
      alt: 'Banner tablets',
    },
  ];

  return (
    <section className={style.slider}>
      <div className="container">
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={style.slider__container}>
        <div className={style.slider__wrapper}>
          <button
            className={`${style.slider__button_prev} slider__button_prev_btn`}
          >
            <img src={prevArrow} alt="Previous arrow" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            observer={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            slidesPerView={1}
            observeParents={true}
            navigation={{
              nextEl: '.slider__button_next_btn',
              prevEl: '.slider__button_prev_btn',
            }}
            pagination={{ clickable: true, el: '.slider__pagination' }}
          >
            {images.map(picture => {
              const { alt, image } = picture;

              return (
                <SwiperSlide key={alt} className={style.slide}>
                  <Slide key={image.alt} image={image} alt={alt} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            className={`${style.slider__button_next} slider__button_next_btn`}
          >
            <img src={nextArrow} alt="Next arrow" />
          </button>
        </div>
        <div className={`${style.slider__pagination} slider__pagination`}></div>
      </div>
    </section>
  );
};
