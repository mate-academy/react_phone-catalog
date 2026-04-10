import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Banner.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '../Icon';
import classNames from 'classnames';

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__container}>
        <button className={classNames(styles.banner__button, 'button-prev')}>
          <Icon name="left" className={styles.leftRight} />
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          navigation={{
            prevEl: '.button-prev',
            nextEl: '.button-next',
          }}
          pagination={{
            clickable: true,
            el: `.${styles.banner__pagination}`,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          className={styles.banner__swiper}
        >
          <SwiperSlide>
            <button className={styles.buttons}>ORDER NOW</button>
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="src/assets/image/sliderPhoto1.png"
              />
              <img
                src="img/banner-phones.png"
                alt="Phones"
                className={styles.banner__image}
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <button className={styles.buttons}>ORDER NOW</button>
            <picture>
              <source
                media="(max-width:640px)"
                srcSet="src/assets/image/sliderPhoto2png.png"
              />
              <img
                src="img/banner-tablets.png"
                alt="Phones"
                className={styles.banner__image}
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <button className={styles.buttons}>ORDER NOW</button>
            <picture>
              <source
                media="(max-width:640px)"
                srcSet="src/assets/image/sliderPhoto3.png"
              />
              <img
                src="img/banner-accessoriess.png"
                alt="Phones"
                className={styles.banner__image}
              />
            </picture>
          </SwiperSlide>
        </Swiper>
        <button className={classNames(styles.banner__button, 'button-next')}>
          <Icon name="right" className={styles.leftRight} />
        </button>
      </div>
      <div className={styles.banner__pagination}></div>
    </div>
  );
};
