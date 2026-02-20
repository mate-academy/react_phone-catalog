import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './PicturesSlider.module.scss';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { PRODUCTS_SLIDES_IMG } from '../../constants/picturesSliderImg';

import okeyHandIcon from '../../images/icons/okey-hand.svg';

export const PicturesSlider = () => {
  const slides = useMemo(() => PRODUCTS_SLIDES_IMG, []);

  return (
    <section className={styles.picturesSlider}>
      <h1 className={styles.picturesSlider__heading}>
        Welcome to Nice Gadgets store!
      </h1>

      <div className={styles.picturesSlider__slider}>
        <div className={styles.picturesSlider__wrapper}>
          <div className={styles.picturesSlider__contentWrapper}>
            <div className={styles.picturesSlider__content}>
              <h4 className={styles.picturesSlider__sliderHeading}>
                Now available in our store!
                <span>
                  <img src={okeyHandIcon} alt="okey-hand" />
                </span>
              </h4>
              <span className={styles.picturesSlider__text}>Be the first!</span>
              <Link
                to="/phones/apple-iphone-14-128gb-midnight"
                className={styles.picturesSlider__button}
              >
                Order now
              </Link>
            </div>
          </div>
          <Swiper
            className={styles.picturesSlider__slides}
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: `.${styles.picturesSlider__nextEl}`,
              prevEl: `.${styles.picturesSlider__prevEl}`,
            }}
            pagination={{
              clickable: true,
              el: `.${styles.picturesSlider__pagination}`,
              bulletClass: `${styles['picturesSlider__pagination-bullet']}`,
              bulletActiveClass: `${styles['picturesSlider__pagination-bullet-active']}`,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
          >
            {slides.map(slide => (
              <SwiperSlide
                key={slide.id}
                className={styles.picturesSlider__slide}
              >
                <img
                  className={styles.picturesSlider__img}
                  src={slide.src}
                  alt={`Slide ${slide.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.picturesSlider__nextEl} />
        <div className={styles.picturesSlider__prevEl} />
        <div className={styles.picturesSlider__pagination} />
      </div>
    </section>
  );
};
