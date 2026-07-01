import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperClass from 'swiper';
import styles from './BigSwiper.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Thumbs } from 'swiper/modules';

type Props = {
  images: string[];
  thumbsSwiper: SwiperClass | null;
};

export const BigSwiper = ({ images, thumbsSwiper }: Props) => {
  return (
    <Swiper
      className={styles.bigSwiper}
      modules={[Thumbs]}
      thumbs={{ swiper: thumbsSwiper }}
      spaceBetween={10}
      slidesPerView={1}
    >
      {images.map(image => (
        <SwiperSlide key={image} className={styles.bigSwiper__slide}>
          <img src={image} alt="" className={styles.bigSwiper__image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
