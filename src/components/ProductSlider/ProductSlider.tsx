import React, { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Navigation } from 'swiper/modules';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import productSliderStyles from './ProductSlider.module.scss';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import classNames from 'classnames';

type Props = {
  products: Product[];
  children?: React.ReactNode;
};

export const ProductSlider: React.FC<Props> = ({ products, children = '' }) => {
  const visibleProducts = useMemo(() => products.slice(0, 10), [products]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === visibleProducts.length - 1;

  return (
    <div className={productSliderStyles.productSlider}>
      <div className={productSliderStyles.productSlider__header}>
        {children}
        <div className={productSliderStyles.productSlider__navButtons}>
          <button
            ref={prevButtonRef}
            className={classNames('button', {
              ['button--disabled']: isFirstSlide,
            })}
            aria-disabled={isFirstSlide}
          >
            <IconSvg
              dataPath={ICON_DATA_PATHS.ARROW.LEFT}
              isDisabled={isFirstSlide}
            />
          </button>
          <button
            ref={nextButtonRef}
            className={classNames('button', {
              ['button--disabled']: isLastSlide,
            })}
            aria-disabled={isLastSlide}
          >
            <IconSvg
              dataPath={ICON_DATA_PATHS.ARROW.RIGHT}
              isDisabled={isLastSlide}
            />
          </button>
        </div>
      </div>

      <div className={productSliderStyles.productSlider__sliderWrapper}>
        <Swiper
          modules={[Grid, Navigation]}
          className={productSliderStyles.productSlider___slider}
          grid={{
            rows: 1,
            fill: 'row',
          }}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          spaceBetween={16}
          breakpoints={{
            320: {
              slidesPerView: 4 / 3,
            },
            640: {
              slidesPerView: 2.4,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {visibleProducts.map(product => (
            <SwiperSlide
              key={product.id}
              className={productSliderStyles.productSlider___slide}
            >
              <ProductCard
                product={product}
                className={productSliderStyles.productSlider__productCard}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
