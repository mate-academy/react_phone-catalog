import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import React, { useState } from 'react';
import style from './Gallery.module.scss';
import cn from 'classnames';
import { DetailedProduct } from '../../../../types/DetailedProduct';

type Props = {
  product: DetailedProduct;
};

export const Gallery: React.FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={cn(style.product__gallery, style.gallery)}>
      <div className={style.gallery__thumbnails}>
        {product.images.map((imgSrc, index) => (
          <button
            className={cn(style.gallery__thumbnail, {
              [style['gallery__thumbnail--active']]: index === activeIndex,
            })}
            key={index}
            onClick={() => swiper?.slideToLoop(index)}
          >
            <img
              src={imgSrc}
              alt={`${product.name} image ${index + 1}`}
              className={style['gallery__thumbnail-img']}
            />
          </button>
        ))}
      </div>
      <Swiper
        slidesPerView={1}
        onSwiper={setSwiper}
        loop={true}
        onSlideChange={swiperInstance =>
          setActiveIndex(swiperInstance.realIndex)
        }
        className={style.gallery__swiper}
      >
        {product.images.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgSrc}
              alt={`${product.name} image ${index + 1}`}
              className={style['gallery__main-image']}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
