import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import styles from './picturesSlider.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const PicturesSlider: React.FC = () => {
  return (
    <section className={styles.sliderWrapper}>
      <button
        id="banner-prev"
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        aria-label="Previous slide"
      />

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        loop={true}
        navigation={{
          prevEl: '#banner-prev',
          nextEl: '#banner-next',
        }}
        autoplay={{ delay: 5000 }}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.slide}>
          <img
            src="/img/slider1.png"
            alt="iPhone 17 Pro"
            className={styles.bannerImg}
          />
          <div className={styles.infoBlock}>
            <h2 className={`${styles.title} ${styles.iphoneGradientText}`}>
              Now available <br />
              <span className={styles.iphoneGradientText}>in our store!</span>
            </h2>
            <p className={styles.subtitle}>Be the first!</p>
            <Link to="/phones" className={styles.orderButton}>
              Order now
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <img
            src="/img/slider2.png"
            alt="Tablets Banner"
            className={styles.bannerImg}
          />
          <div className={styles.infoBlock}>
            <h2 className={`${styles.title} ${styles.tabletGradientText}`}>
              Built for speed!
            </h2>
            <p className={styles.subtitle}>Explore new models</p>
            <Link to="/tablets" className={styles.orderButton}>
              Order now
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <img
            src="/img/slider3.png"
            alt="Accessories Banner"
            className={styles.bannerImg}
          />
          <div className={styles.infoBlock}>
            <h2 className={`${styles.title} ${styles.accessoriesGradientText}`}>
              Accessories
            </h2>
            <p className={styles.subtitle}>Refresh your style</p>
            <Link to="/accessories" className={styles.orderButton}>
              Order now
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>

      <button
        id="banner-next"
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label="Next slide"
      />
    </section>
  );
};
