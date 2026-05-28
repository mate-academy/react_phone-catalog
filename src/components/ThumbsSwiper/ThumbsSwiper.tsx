import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ThumbsSwiper.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Thumbs } from 'swiper/modules';
import type SwiperClass from 'swiper';

type Props = {
  images: string[];
  onSwiper: (swiper: SwiperClass) => void;
};

export const ThumbsSwiper = ({ images, onSwiper }: Props) => {
  return (
    <Swiper
      className={styles.thumbsSwiper}
      modules={[Thumbs]}
      onSwiper={onSwiper}
      spaceBetween={8}
      slidesPerView={5}
      watchSlidesProgress
      breakpoints={{
        640: {
          direction: 'vertical',
          slidesPerView: 5,
          spaceBetween: 8,
        },
      }}
    >
      {images.map(image => (
        <SwiperSlide key={image} className={styles.thumbsSwiper__slide}>
          <img src={image} alt="" className={styles.thumbsSwiper__image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
