import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './BannerSlider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
export const BannerSlider = () => {
  const images = [
    '/img/banner-phones.png',
    '/img/banner-accessories.png',
    '/img/banner-tablets.png',
  ];

  return (
    <div className={styles.container}>
      <button className={styles.sliderButton} id="main-prev-button">
        <img src="/img/left.svg" alt="left" className={styles.leftButton} />
      </button>
      <div className={styles.mainSwiper}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={8}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: '#main-slider-pagination',
          }}
          autoplay={{ delay: 5000 }}
          loop={false}
          className={styles.swiperBlock}
          navigation={{
            prevEl: '#main-prev-button',
            nextEl: '#main-next-button',
          }}
        >
          {images.map(img => (
            <SwiperSlide key={img}>
              <img alt="banner" src={img} className={styles.bannerImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button className={styles.sliderButton} id="main-next-button">
        <img src="/img/right.svg" alt="right" className={styles.rightButton} />
      </button>
      <span
        id="main-slider-pagination"
        className={styles.mainPagination}
      ></span>
    </div>
  );
};
