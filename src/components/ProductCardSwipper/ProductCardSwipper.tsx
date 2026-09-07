import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';

import { ProductCard } from '../ProductCard/ProductCard';
import { CatalogItem } from '../../types/CatalogItem';

import './ProductCardSwipper.scss';
import 'swiper/css/navigation';
import 'swiper/css';

interface Props {
  blockName: string;
  products: CatalogItem[];
  showDiscount?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({ blockName, products, showDiscount = false }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiper) {
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [swiper]);

  return (
    <div className="swipper">
      <div className="swipper__header">
        <h3 className="swipper__name">{blockName}</h3>
        <div className="swipper__buttons">
          <div
            ref={prevRef}
            className={`swipper__button swipper__button--prev ${isBeginning ? 'swipper__button--disabled' : ''}`}
          >
            <img src="./img/left.png" alt="left" className="swipper__button__img" />
          </div>
          <div
            ref={nextRef}
            className={`swipper__button swipper__button--next ${isEnd ? 'swipper__button--disabled' : ''}`}
          >
            <img src="./img/right.png" alt="right" className="swipper__button__img" />
          </div>
        </div>
      </div>

      <div className="swipper__content">
        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiper}
          onSlideChange={currentSwiper => {
            setIsBeginning(currentSwiper.isBeginning);
            setIsEnd(currentSwiper.isEnd);
          }}
          breakpoints={{
            300: { slidesPerView: 1.5, spaceBetween: 16 },
            450: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
            1000: { slidesPerView: 4, spaceBetween: 16 },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} showDiscount={showDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
