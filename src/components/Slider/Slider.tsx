/* eslint-disable import/no-extraneous-dependencies */
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './Slider.module.scss';

interface Props {
  images: string[];
  setMainSwiper: (swiper: unknown) => void;
  onSlideChange: (index: number) => void;
}

const ImageSlider: React.FC<Props> = ({
  images,
  setMainSwiper,
  onSlideChange,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      className={styles.img__container}
      onSwiper={setMainSwiper}
      onSlideChange={swiper => onSlideChange(swiper.activeIndex)}
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <div className={styles.img__wrapper}>
            <img
              className={styles.item__main__img}
              src={imageUrl}
              alt={`Slide ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
