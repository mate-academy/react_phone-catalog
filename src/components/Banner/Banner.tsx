import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Banner.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '../Icon';
import classNames from 'classnames';
import sliderPhoto1 from '../../assets/image/sliderPhoto1.png';
import sliderPhoto2 from '../../assets/image/sliderPhoto2png.png';
import sliderPhoto3 from '../../assets/image/sliderPhoto3.png';

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
                srcSet={sliderPhoto1}
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
                media="(max-width: 640px)"
                srcSet={sliderPhoto2}
              />
              <img
                src="img/banner-tablets.png"
                alt="Tablets"
                className={styles.banner__image}
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <button className={styles.buttons}>ORDER NOW</button>
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet={sliderPhoto3}
              />
              <img
                src="img/banner-accessoriess.png"
                alt="Accessories"
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