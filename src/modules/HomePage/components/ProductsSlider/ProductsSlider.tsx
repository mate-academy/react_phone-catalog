import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../../../shared/ProductCard';
import { getSortedProducts } from '../../../../utils/sortProducts';
import { ProductPreview } from 'types/ProductPreview';
import { BlockTitle } from 'types/BlockTitle';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  products: ProductPreview[];
  title: BlockTitle;
  sortBy?: string;
  showDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  sortBy,
  showDiscount,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const sortedProducts = getSortedProducts(products, sortBy || '');

  const syncBeginEnd = (inst: SwiperClass | null) => {
    if (!inst) {
      return;
    }

    inst.update();
    setIsBeginning(Boolean(inst.isBeginning));
    setIsEnd(Boolean(inst.isEnd));
  };

  const handleOnSwiper = (inst: SwiperClass) => {
    setSwiperInstance(inst);

    requestAnimationFrame(() => syncBeginEnd(inst));

    try {
      const ro = new ResizeObserver(() => {
        syncBeginEnd(inst);
      });

      ro.observe(inst.el);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-param-reassign
      (inst as any).__ro = ro;
    } catch (e) {
      return;
    }
  };

  const handleSlideChange = (inst: SwiperClass) => {
    setIsBeginning(Boolean(inst.isBeginning));
    setIsEnd(Boolean(inst.isEnd));
  };

  const handleImagesReady = (inst: SwiperClass) => {
    inst.update();
    setIsBeginning(Boolean(inst.isBeginning));
    setIsEnd(Boolean(inst.isEnd));
  };

  useEffect(() => {
    return () => {
      if (swiperInstance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ro = (swiperInstance as any).__ro;

        if (ro && typeof ro.disconnect === 'function') {
          ro.disconnect();
        }
      }
    };
  }, [swiperInstance]);

  return (
    <>
      <div className="products-slider">
        <div className="products-slider__header">
          <h2 className="products-slider__subtitle">{title}</h2>
          <div className="products-slider__container">
            <button
              className={`arrow arrow-left ${isBeginning ? 'arrow-left-disabled' : ''}`}
              onClick={() => {
                if (!swiperInstance) {
                  return;
                }

                swiperInstance.slidePrev();
                setIsBeginning(Boolean(swiperInstance.isBeginning));
                setIsEnd(Boolean(swiperInstance.isEnd));
              }}
            />
            <button
              className={`arrow arrow-right ${isEnd ? 'arrow-right-disabled' : ''}`}
              onClick={() => {
                if (!swiperInstance) {
                  return;
                }

                swiperInstance.slideNext();
                setIsBeginning(Boolean(swiperInstance.isBeginning));
                setIsEnd(Boolean(swiperInstance.isEnd));
              }}
            />
          </div>
        </div>
        <div className="swiper-container">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={'auto'}
            centeredSlides={false}
            onSwiper={handleOnSwiper}
            onSlideChange={handleSlideChange}
            onResize={inst => syncBeginEnd(inst)}
            onAfterInit={handleImagesReady}
            observer={true}
            observeParents={true}
            watchOverflow={true}
            className="my-swiper"
          >
            {sortedProducts.slice(0, 10).map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} showDiscount={showDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
