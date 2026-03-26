import { ProductDetails } from '../../../../types/ProductDetails';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Img from './images.module.scss';
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import 'swiper/css';

type Props = {
  product: ProductDetails;
};

export const Images: React.FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={Img.gallery}>
      <div className={Img.gallery__miniatures}>
        {product.images.map((img, index) => (
          <button
            className={cn(Img.gallery__miniature, {
              [Img.gallery__miniature__active]: index === activeIndex,
            })}
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
          >
            <img
              src={img}
              alt={`${product.name} image ${index + 1}`}
              className={Img.gallery__miniature__img}
            />
          </button>
        ))}
      </div>
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        loop
        onSlideChange={swiperInstance =>
          setActiveIndex(swiperInstance.realIndex)
        }
        className={Img.gallery__swiper}
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${product.name} image`}
              className={Img.gallery__main__image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
