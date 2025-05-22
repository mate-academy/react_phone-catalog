import React, { memo, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Navigation } from 'swiper/modules';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import sliderSectionStyles from './SectionSlider.module.scss';
import classNames from 'classnames';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { IconButton } from '../IconButton/IconButton';
import { getNormalizedTitle } from '../../helpers/stringHelper';

type Props = {
  products: Product[];
  title: string;
  sortFn?: (a: Product, b: Product) => number;
  className?: string;
};

export const SectionSlider: React.FC<Props> = memo(
  ({ products, title, sortFn = () => 0, className }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const prevButtonRef = useRef<HTMLButtonElement | null>(null);
    const nextButtonRef = useRef<HTMLButtonElement | null>(null);
    const visibleProducts = useMemo(
      () => [...products].sort(sortFn),
      [products, sortFn],
    );
    const isFirstSlide = activeIndex === 0;
    const isLastSlide = activeIndex === visibleProducts.length - 1;

    return (
      <div className={classNames(className, sliderSectionStyles.sliderSection)}>
        <div className={sliderSectionStyles.sliderSection__header}>
          <SectionTitle title={getNormalizedTitle(title)} />
          <div className={sliderSectionStyles.sliderSection__navButtons}>
            <IconButton
              ref={prevButtonRef}
              iconDataPath={ICON_DATA_PATHS.ARROW.LEFT}
              className={sliderSectionStyles.sliderSection__button}
              disabled={isFirstSlide}
            />
            <IconButton
              ref={nextButtonRef}
              iconDataPath={ICON_DATA_PATHS.ARROW.RIGHT}
              className={sliderSectionStyles.sliderSection__button}
              disabled={isLastSlide}
            />
          </div>
        </div>

        <div className={sliderSectionStyles.sliderSection__sliderWrapper}>
          <Swiper
            modules={[Grid, Navigation]}
            cssMode={true}
            className={sliderSectionStyles.sliderSection___slider}
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
            onSwiper={swiper => {
              const navigationParams = swiper.params.navigation;

              if (navigationParams && typeof navigationParams !== 'boolean') {
                navigationParams.prevEl = prevButtonRef.current;
                navigationParams.nextEl = nextButtonRef.current;

                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.4,
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
                className={sliderSectionStyles.sliderSection___slide}
              >
                <ProductCard
                  product={product}
                  className={sliderSectionStyles.sliderSection__productCard}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  },
);

SectionSlider.displayName = 'SectionSlider';
