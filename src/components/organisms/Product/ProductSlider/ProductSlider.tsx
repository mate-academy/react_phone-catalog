import { useState } from 'react';

import classNames from 'classnames';
import { React360Viewer } from 'react-360-product-viewer';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageWithFallback } from '../../ImageWithFallback';

import 'swiper/css';
import styles from './ProductSlider.module.scss';

type Props = {
  productId: number;
  images: string[];
  images360?: string[];
  name: string;
  className?: string;
};

export const ProductSlider = ({
  productId,
  images,
  images360 = [],
  name,
  className,
}: Props) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const has360 = images360.length > 1;

  const images360BaseUrl =
    has360 ? images360[0].substring(0, images360[0].lastIndexOf('/') + 1) : '';

  return (
    <div className={classNames(styles.slider, className)}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={classNames(styles.thumbnail, {
              [styles.activeThumbnail]: activeIndex === index,
            })}
            onClick={() => swiper?.slideTo(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={activeIndex === index}
          >
            <ImageWithFallback
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
            />
          </button>
        ))}

        {has360 && (
          <button
            type="button"
            className={classNames(styles.thumbnail, styles.thumbnail360, {
              [styles.activeThumbnail]: activeIndex === images.length,
            })}
            onClick={() => swiper?.slideTo(images.length)}
            aria-label="View product in 360 degrees"
            aria-pressed={activeIndex === images.length}
          >
            <span
              className={styles.previewIcon}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      <Swiper
        className={styles.mainSlider}
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={(instance) => {
          setActiveIndex(instance.activeIndex);
        }}
        noSwipingClass="swiper-no-swiping"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className={styles.mainImage}>
              <ImageWithFallback
                src={image}
                data-product-image={productId}
                alt={`${name} image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}

        {has360 && (
          <SwiperSlide>
            <div
              className={classNames(
                styles.mainImage,
                styles.viewer360,
                'swiper-no-swiping',
              )}
            >
              <React360Viewer
                imagesBaseUrl={images360BaseUrl}
                imagesCount={images360.length}
                imagesFiletype="webp"
                mouseDragSpeed={20}
                autoplay={false}
                showRotationIconOnStartup
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
