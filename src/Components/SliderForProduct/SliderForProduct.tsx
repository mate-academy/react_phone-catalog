import './SliderForProduct.scss';
import type { Product } from '../../types/products';
import { ButtonArrow } from '../../ui/ButtonArrow/ButtonArrow';
import { SwiperComponent } from '../SwiperComponent';
import { useRef, useState } from 'react';
import type { SwiperClass } from 'swiper/react';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import 'swiper/css';
// @ts-expect-error
import 'swiper/css/pagination';
// @ts-expect-error
import 'swiper/css/navigation';
/* eslint-enable @typescript-eslint/ban-ts-comment */

interface PropsSliderNewProduct {
  visibleProducts: Product[];
  title: string;
  loading?: boolean;
}

export const SliderForProduct = ({
  visibleProducts,
  title,
  loading,
}: PropsSliderNewProduct) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const onSwiperInit = (swiper: SwiperClass) => {
    swiperRef.current = swiper;
    setActiveIndex(swiper.activeIndex);

    swiper.on('slideChange', () => {
      setActiveIndex(swiper.activeIndex);
    });
  };
  const swiperInstance = swiperRef.current;
  const dynamicSlides = swiperInstance?.slidesPerViewDynamic() || 1;

  const isBeginning = activeIndex === 0;
  const isEnd = activeIndex >= visibleProducts.length - dynamicSlides;

  return (
    <section className="slider-for-product">
      <div className="slider-content-wrapper">
        <div className="slider-header">
          <h2 className="slider-title">{title}</h2>
          <div className="slider-navigation-buttons">
            <ButtonArrow
              icon="arrow"
              direction="left"
              onClick={handlePrev}
              disabled={isBeginning}
            />
            <ButtonArrow
              icon="arrow"
              direction="right"
              onClick={handleNext}
              disabled={isEnd}
            />
          </div>
        </div>

        <SwiperComponent
          loading={loading}
          products={visibleProducts}
          onSwiperInit={onSwiperInit}
        />
      </div>
    </section>
  );
};
