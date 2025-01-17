import 'swiper/css';
import 'swiper/css/pagination';
import './PhonesSlider.scss';

import classNames from 'classnames';
import 'swiper/css/navigation';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  title: string;
  products: Product[];
  discount?: boolean;
  slash?: boolean | undefined;
};

export const PhonesSlider: React.FC<Props> = ({
  title,
  products,
  discount,
}) => {
  const sliderRef = useRef<React.MutableRefObject<null>>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const { theme } = useAppSelector(state => state.theme);

  return (
    <div className="container phonesSlider">
      <div className="title">
        <h2>{title}</h2>

        <div className="controls">
          <div ref={prevRef} className="icon_container">
            <div
              className={classNames('icon', 'icon_left', {
                'dark-theme': theme === 'dark',
                'light-theme': theme === 'light',
              })}
            />
          </div>

          <div ref={nextRef} className="icon_container">
            <div
              className={classNames('icon', 'icon_right', {
                'dark-theme': theme === 'dark',
                'light-theme': theme === 'light',
              })}
            />
          </div>
        </div>
      </div>

      <div className="swiper_container">
        <Swiper
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={sliderRef}
          slidesPerView={'auto'}
          spaceBetween={16}
          className="phonesSlider"
          modules={[Navigation]}
          onInit={swiper => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevRef.current;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {products.map((product: Product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} discount={discount} slash />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
