import React from 'react';
import styles from './PicturesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = ['banner-1', 'banner-phones', 'banner-accessories'];

export const PicturesSlider: React.FC = () => {
  return (
    <section className={styles.slider}>
      <div className={styles.title}>
        <h1>Welcome to Nice Gadgets store!</h1>
        <h2 className={styles.title_hidden}>Product Catalog</h2>
      </div>

      <div className={styles.swiperWrapper}>
        <div className={`custom-swiper-prev ${styles.navBtn}`}>
          <img src="./img/icons/arrow-left.svg" alt="Previous" />
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 50000, disableOnInteraction: false }}
          loop={true}
          pagination={{ el: '.custom-pagination', clickable: true }}
          navigation={{
            prevEl: '.custom-swiper-prev',
            nextEl: '.custom-swiper-next',
          }}
          slidesPerView={1}
          className={styles.sliderSwiper}
        >
          {slides.map((name, index) => (
            <SwiperSlide key={index}>
              <div className={`${styles.image} ${styles[name]}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={`custom-swiper-next ${styles.navBtn}`}>
          <img src="./img/icons/arrow-right.svg" alt="Next" />
        </div>
      </div>
      <div className="custom-pagination" />
    </section>
  );
};
