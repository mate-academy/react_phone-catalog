import './ProductSlider.scss';

import { Product } from '../../../../types/Product';
import ProductCard from '../../../../shared/ProductCard/ProductCard';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';

type Props = {
  anyProducts: Product[];
  discount: boolean;
  title: string;
};

export const ProductSlider: React.FC<Props> = ({
  anyProducts,
  discount,
  title,
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div className="product-slider">
      <div className="product-slider__header">
        <h2 className="text-h2">{title}</h2>
        <div className="icon-group">
          {slideIndex !== 0 ? (
            <div
              className="icon icon-32"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <div className="icon--arrow-left"></div>
            </div>
          ) : (
            <div
              className="icon icon-deactivate icon-32 "
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <div className="icon--arrow-left-deactivate"></div>
            </div>
          )}

          <div
            className="icon icon-32"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className="icon--arrow-right"></div>
          </div>
        </div>
      </div>

      <div className="product-slider__list">
        <Swiper
          loop={false}
          spaceBetween={16}
          slidesPerView="auto"
          onSwiper={s => {
            swiperRef.current = s;
          }}
          onSlideChange={s => setSlideIndex(s.activeIndex)}
        >
          {anyProducts.map((product: Product) => (
            <SwiperSlide key={product.id} style={{ width: 'auto' }}>
              <ProductCard
                key={product.id}
                currentProduct={product}
                discount={discount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
