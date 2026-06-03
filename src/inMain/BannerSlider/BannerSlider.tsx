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
      <button className={styles.sliderButton} id="#main-prev-button">
        {'<'}
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '#main-slider-pagination',
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className={styles.mainSwiper}
        navigation={{
          prevEl: '#main-prev-button',
          nextEl: '#main-next-button',
        }}
      >
        <SwiperSlide>
          <div className={styles.sliderButtonDas}>
            {images.map(img => (
              <img alt={img} src={img} key={img} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
      <button className={styles.sliderButton} id="#main-next-button">
        {'>'}
      </button>
      <div id="#main-slider-pagination" className={styles.mainPagination}></div>
    </div>
  );
};
