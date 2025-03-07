/* eslint-disable max-len */
import { useMediaQuery } from 'react-responsive';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
// import image from '../../../../../public/img/Home_banner/Banner1_desktop.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';

import styles from './HomeBanner.module.scss';
import { images } from './Banner';

export const HomeBanner = () => {
  // const [deviceImages, setDeviceImages] = useState<string[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const deviceImages = isMobile ? images.mobile : images.desktop;

  // useEffect(() => {
  //   const updateImages = () => {
  //     if (window.innerWidth >= 1200) {
  //       setDeviceImages(images.desktop);
  //     } else if (window.innerWidth >= 640) {
  //       setDeviceImages(images.tablet);
  //     } else {
  //       setDeviceImages(images.mobile);
  //     }
  //   };

  //   updateImages();
  //   window.addEventListener('resize', updateImages);

  //   return () => {
  //     window.removeEventListener('resize', updateImages);
  //   };
  // }, []);

  return (
    <section className={styles.home__banner}>
      <h2 className="is-hidden">Home banner</h2>
      <button className={styles.prevButton}></button>
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
      <button className={styles.nextButton}></button>
      <div className="custom-pagination"></div>
    </section>
  );
};
