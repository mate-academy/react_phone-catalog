/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Accessory } from '../../../types/Accessory';
import { Phone } from '../../../types/Phone';
import { Tablet } from '../../../types/Tablet';
import { Pagination, Thumbs } from 'swiper/modules';
import styles from './CurrentProductSlider.module.scss';
import 'swiper/css/thumbs';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setVerticalPaginationHeight } from '../../../features/pagesDetailsSlice';

type SliderType = {
  gadget: Phone | Tablet | Accessory | null;
};

export const CurrentProductSlider: React.FC<SliderType> = gadget => {
  const dispatch = useAppDispatch();

  let images: string[] | undefined = [];
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [gap, setGap] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const verticalPaginationHeight = useAppSelector(
    state => state.pagesDetails.verticalPaginationHeight,
  );

  useEffect(() => {
    const updatePaginationHeightTablet = () => {
      if (window.innerHeight >= 1200) {
        return;
      }

      const swiperContainer = document.getElementById('swiperContainer');

      const swiperContainerWidth = swiperContainer?.clientWidth;

      let fractionWidth;

      if (swiperContainerWidth) {
        fractionWidth = (swiperContainerWidth - 11 * 16) / 12;
      }

      let paginationSize;

      if (images && fractionWidth) {
        paginationSize =
          fractionWidth * images.length + (images.length - 1) * 8;
      }

      if (paginationSize) {
        dispatch(setVerticalPaginationHeight(paginationSize));
      }
    };

    const updatePaginationHeightDesktop = () => {
      if (window.innerHeight < 1200) {
        return;
      }

      let paginationSize;

      if (images) {
        paginationSize =
          (32 * 2 + 16) * images.length + (images.length - 1) * 16;
      }

      if (paginationSize) {
        dispatch(setVerticalPaginationHeight(paginationSize));
      }
    };

    const updateSwiperPagination = () => {
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

    updateSwiperPagination();
    updatePaginationHeightTablet();
    updatePaginationHeightDesktop();

    window.addEventListener('resize', updateSwiperPagination);
    window.addEventListener('resize', updatePaginationHeightTablet);
    window.addEventListener('resize', updatePaginationHeightDesktop);

    return () => {
      window.removeEventListener('resize', updateSwiperPagination);
      window.removeEventListener('resize', updatePaginationHeightTablet);
      window.removeEventListener('resize', updatePaginationHeightDesktop);
    };
  }, [gadget]);

  if (gadget !== null && gadget.gadget?.images !== undefined) {
    images = gadget.gadget?.images;
  }

  return (
    <div id="swiperContainer" className={styles.swiperContainer}>
      <Swiper
        modules={[Pagination, Thumbs]}
        className={styles.slider}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={swiper => setActiveSlide(swiper.activeIndex)}
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
        style={
          direction === 'vertical'
            ? { height: verticalPaginationHeight }
            : { height: 'auto' }
        }
      >
        {images.map((image, index) => (
          <SwiperSlide
            id="paginationPreview"
            className={`${styles.preview} ${index === activeSlide && styles.activeSlide}`}
            key={image}
          >
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
