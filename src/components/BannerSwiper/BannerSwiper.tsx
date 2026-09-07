import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { MainSlider } from './MainSlider';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './BannerSwiper.module.scss';

export default function BannerSwiper() {
  const { handlePrevSlide, handleNextSlide, onSwiperInit } = MainSlider();

  const banner = [
    'img/banner-phones.png',
    // 'img/Banner.svg',
    'img/banner-accessories.png',
    'img/banner-tablets.png',
  ];

  return (
    <>
      <div>
        <div className={styles.swiperContainer}>
          <button
            className={`${styles.buttonPrev} hasShadow`}
            onClick={handlePrevSlide}
          >
            {'<'}
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: `.${styles.buttonNext}`,
              prevEl: `.${styles.buttonPrev}`,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: `.${styles.sliderPagination}`,
            }}
            onSwiper={onSwiperInit}
            effect="fade"
            loop={true}
            className={styles.swiperImages}
          >
            {banner.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className={styles.banner}
                  style={{ backgroundImage: `url(${url})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`${styles.buttonNext} hasShadow`}
            onClick={handleNextSlide}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.sliderPagination}></div>
    </>
  );
}
