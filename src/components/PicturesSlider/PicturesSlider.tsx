import styles from './PicturesSlider.module.scss';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
// import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div
          className={`backBtn button ${styles.sliderButton} slider-prev`}
          onClick={() => swiper.slidePrev()}
        >
          <span className="icon arrow" />
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          navigation={{
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
          }}
          pagination={{
            el: `.${styles.dots}`,
            clickable: true,

            renderBullet: (index, className) => `
              <span class=' ${className}'></span>
            `,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className={styles.pictureContainer}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide}>
              <img
                key={slide}
                src={slide}
                alt="Slide"
                className={styles.picture}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`${styles.sliderButton} button slider-next`}
          onClick={() => swiper.slideNext()}
        >
          <span className="icon arrow" />
        </div>
      </div>

      <div className={styles.dots}></div>
    </div>
  );
};
