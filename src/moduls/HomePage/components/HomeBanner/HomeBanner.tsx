/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { useMediaQuery } from 'react-responsive';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';

import { images } from './Banner';
import { ArrowIcon } from '../../../../shared/components/Icons/Arrow/ArrowIcon';

import styles from './HomeBanner.module.scss';

export const HomeBanner = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const deviceImages = isMobile ? images.mobile : images.desktop;

  return (
    <section className={styles.home__banner}>
      <h2 className="is-hidden">Home banner</h2>
      <ArrowIcon direction="left" className={styles.prevButton} />
      <div className={styles.banner}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: `.${styles.nextButton}`,
            prevEl: `.${styles.prevButton}`,
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
        >
          {deviceImages.map((src, index) => (
            <SwiperSlide key={index} className={styles.swiper__slide}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={styles.slide__img}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ArrowIcon direction="right" className={styles.nextButton} />
      <div className="custom-pagination"></div>
    </section>
  );
};
