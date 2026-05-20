import React from 'react';

import { Icon } from '../Icon';
import styles from './PicturesSlider.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  banners: string[];
  id: number;
};

export const PicturesSlider: React.FC<Props> = ({ banners, id }) => {
  const prevClass = `prev-${id}`;
  const nextClass = `next-${id}`;

  return (
    <div className={styles.slider}>
      <div className={styles.container}>
        <button className={prevClass}>
          <Icon name="arrowleft" />
        </button>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          className={styles.swiper}
        >
          {banners.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="image" className={styles.img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={nextClass}>
          <Icon name="arrowright" />
        </button>
      </div>
      <div className={styles.pagination} />
    </div>
  );
};
