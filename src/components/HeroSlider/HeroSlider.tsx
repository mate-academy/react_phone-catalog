import styles from './HeroSlider.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  'img/banner.png',
  'img/banner-phones.png',
  'img/banner-accessories.png',
];

export const HeroSlider = () => {
  return (
    <>
      <div className={styles.container}>
        <button
          className={`${styles.prevBtn} ${styles.navButton}`}
          aria-label="Prev Slide"
        >
          <img src="img/icons/arrow-left.png" alt="Arrow Left" />
        </button>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: `.${styles.prevBtn}`,
            nextEl: `.${styles.nextBtn}`,
          }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={img}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`${styles.nextBtn} ${styles.navButton}`}
          aria-label="Next slide"
        >
          <img src="img/icons/arrow-right.png" alt="Arrow Right" />
        </button>
      </div>
    </>
  );
};
