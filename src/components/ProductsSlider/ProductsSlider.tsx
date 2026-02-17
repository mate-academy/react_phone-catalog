import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeftButton } from '../../images/icons/ArrowLeftButton';
import { ArrowRightButton } from '../../images/icons/ArrowRightButton';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/Product';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import clsx from 'clsx';

export type ProductSliderProps = {
  sliderConfig: {
    titleForBrand: string;
    marginTop: string;
  };
  products: Product[];
};

export const ProductSlider = ({
  sliderConfig,
  products,
}: ProductSliderProps) => {
  const { titleForBrand, marginTop } = sliderConfig;

  // рефи для кнопок
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  // для swiper
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const navigationParams = swiperRef.current.params.navigation;

      if (navigationParams && typeof navigationParams !== 'boolean') {
        navigationParams.prevEl = prevRef.current;
        navigationParams.nextEl = nextRef.current;

        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, [products, prevRef, nextRef]);

  return (
    <div className={marginTop}>
      <div className="relative mb-5">
        <h2 className="h2">{titleForBrand}</h2>

        <div className="absolute right-0 top-1 flex gap-4">
          <button
            ref={prevRef}
            disabled={isBeginning}
            className={clsx('group w-8 h-8', {
              'cursor-pointer': !isBeginning,
              'cursor-not-allowed': isBeginning,
            })}
          >
            <ArrowLeftButton isDisabled={isBeginning} />
          </button>

          <button
            ref={nextRef}
            disabled={isEnd}
            className={clsx('group w-8 h-8', {
              'cursor-pointer': !isEnd,
              'cursor-not-allowed': isEnd,
            })}
          >
            <ArrowRightButton isDisabled={isEnd} />
          </button>
        </div>
      </div>

      <div className="-mr-4 tablet:-mr-6 desktop:mr-0 overflow-visible">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(false);
          }}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          spaceBetween={0}
          slidesPerView="auto"
        >
          {products.map(product => (
            <SwiperSlide
              key={product.id}
              className="max-w-53 tablet:max-w-60 desktop:max-w-68 py-5 px-3"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
