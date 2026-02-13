import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import BannerMobile from '../../../../assets/images/homePageSlider/modile-banner.png';
import BannerDesktop from '../../../../assets/images/homePageSlider/desctop-banner.png';
import RightArrow from '../../../../assets/icons/slider-icons/right-arrow.svg';
import LeftArrow from '../../../../assets/icons/slider-icons/left-arrow.svg';

import styles from './HomePageSlider.module.scss';

export const HomePageSlider = () => {
  return (
    <section className={styles.homeSlider}>
      <div className={styles.homeSlider__container}>
        <button id="prev" className={styles.homeSlider__leftSliderBtn}>
          <img
            src={LeftArrow}
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
                <source media="(min-width: 639px)" srcSet={BannerDesktop} />

                <img
                  loading="lazy"
                  className={styles.homeSlider__bannerImg}
                  src={BannerMobile}
                  alt="Головний слайдер"
                />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source media="(min-width: 639px)" srcSet={BannerDesktop} />

                <img
                  loading="lazy"
                  className={styles.homeSlider__bannerImg}
                  src={BannerMobile}
                  alt="Головний слайдер"
                />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source media="(min-width: 639px)" srcSet={BannerDesktop} />

                <img
                  loading="lazy"
                  className={styles.homeSlider__bannerImg}
                  src={BannerMobile}
                  alt="Головний слайдер"
                />
              </picture>
            </SwiperSlide>
          </Swiper>
        </div>

        <button id="next" className={styles.homeSlider__rightSliderBtn}>
          <img
            src={RightArrow}
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
