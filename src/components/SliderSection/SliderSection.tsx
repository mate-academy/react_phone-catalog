import React, { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Navigation } from 'swiper/modules';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import sliderSectionStyles from './SliderSection.module.scss';
import classNames from 'classnames';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import { IconSvg } from '../IconSvg/IconSvg';
import { SectionTitle } from '../SectionTitle/SectionTitle';

type Props = {
  products: Product[];
  title: string;
  sortFn?: (a: Product, b: Product) => number;
  className?: string;
};

export const SliderSection: React.FC<Props> = ({
  products,
  title,
  sortFn = () => 0,
  className = '',
}) => {
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
        <SectionTitle title={title} />
        <div className={sliderSectionStyles.sliderSection__navButtons}>
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

      <div className={sliderSectionStyles.sliderSection__sliderWrapper}>
        <Swiper
          modules={[Grid, Navigation]}
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
          onBeforeInit={swiper => {
            const navigationParams = swiper.params.navigation;

            if (navigationParams && typeof navigationParams !== 'boolean') {
              navigationParams.prevEl = prevButtonRef.current;
              navigationParams.nextEl = nextButtonRef.current;
            }
          }}
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
};
