import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import styles from './HomePageSlider.module.scss';

export const HomePageSlider = () => {
  return (
    <section className={styles.homeSlider}>
      <div className={styles.homeSlider__container}>
        <button id="prev" className={styles.homeSlider__leftSliderBtn}>
          <img
            loading="lazy"
            src="src/assets/icons/slider-icons/left-arrow.svg"
            alt="Попередній слайд"
            className={styles.homeSlider__leftImgSlider}
          />
        </button>

        <div className={styles.homeSlider__swiperWrapper}>
          <Swiper
            rewind={true}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '#prev',
              nextEl: '#next',
            }}
            pagination={{
              el: '#swiper-pagination',
              clickable: true,
              bulletClass: `${styles.homeSlider__paginationBullet}`,
              bulletActiveClass: `${styles.homeSlider__paginationBulletActive}`,
            }}
          >
            <SwiperSlide>
              <picture>
                <source
                  media="(min-width: 639px)"
                  srcSet="src/assets/images/homePageSlider/banner-desktop.png"
                />

                <img
                  loading="lazy"
                  className={styles.homeSlider__bannerImg}
                  src="src/assets/images/homePageSlider/banner-mobile.png"
                  alt="Головний слайдер"
                />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source
                  media="(min-width: 639px)"
                  srcSet="src/assets/images/homePageSlider/banner-desktop.png"
                />

                <img
                  loading="lazy"
                  className={styles.homeSlider__bannerImg}
                  src="src/assets/images/homePageSlider/banner-mobile.png"
                  alt="Головний слайдер"
                />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source
                  media="(min-width: 639px)"
                  srcSet="src/assets/images/homePageSlider/banner-desktop.png"
                />

                <img
                  loading="lazy"
                  className={styles.homeSlider__bannerImg}
                  src="src/assets/images/homePageSlider/banner-mobile.png"
                  alt="Головний слайдер"
                />
              </picture>
            </SwiperSlide>
          </Swiper>
        </div>

        <button id="next" className={styles.homeSlider__rightSliderBtn}>
          <img
            loading="lazy"
            src="src/assets/icons/slider-icons/right-arrow.svg"
            alt="Наступний слайд"
            className={styles.homeSlider__rightImgSlider}
          />
        </button>

        <div className={styles.homeSlider__wrapper}>
          <div
            id="swiper-pagination"
            className={styles.homeSlider__pagination}
          ></div>
        </div>
      </div>
    </section>
  );
};
