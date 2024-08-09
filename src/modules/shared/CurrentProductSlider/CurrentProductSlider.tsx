import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Accessory } from '../../../types/Accessory';
import { Phone } from '../../../types/Phone';
import { Tablet } from '../../../types/Tablet';
import { Pagination, Thumbs } from 'swiper/modules';
import styles from './CurrentProductSlider.module.scss';
import 'swiper/css/thumbs';

type SliderType = {
  gadget: Phone | Tablet | Accessory | null;
};

export const CurrentProductSlider: React.FC<SliderType> = gadget => {
  let images: string[] | undefined = [];

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [gap, setGap] = useState(0);

  useEffect(() => {
    const updateSwiperDirection = () => {
      if (window.innerWidth < 640) {
        setDirection('horizontal');
      } else {
        setDirection('vertical');
      }

      if (window.innerWidth < 1200) {
        setGap(8);
      } else {
        setGap(16);
      }
    };

    updateSwiperDirection();

    window.addEventListener('resize', updateSwiperDirection);

    return () => {
      window.removeEventListener('resize', updateSwiperDirection);
    };
  }, []);

  if (gadget !== null && gadget.gadget?.images !== undefined) {
    images = gadget.gadget?.images;
  }

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Pagination, Thumbs]}
        className={styles.slider}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map(image => (
          <SwiperSlide className={styles.slide} key={image}>
            <img
              className={styles.slide__image}
              src={image}
              alt="product-image-large"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={images.length}
        className={styles.pagination}
        spaceBetween={gap}
        direction={direction}
      >
        {images.map(image => (
          <SwiperSlide className={styles.preview} key={image}>
            <img
              className={styles.preview__image}
              src={image}
              alt="product-image-small"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
