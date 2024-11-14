import 'swiper/css';
import 'swiper/css/pagination';
import './PhoneSlider.scss';

import classNames from 'classnames';
import 'swiper/css/navigation';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
};

export const PhoneSlider: React.FC<Props> = ({ title, products }) => {
  const sliderRef = useRef<React.MutableRefObject<null>>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classNames('container', 'phoneSlider')}>
      <div className="title">
        <h2>{title}</h2>

        <div className="controls">
          <div
            ref={prevRef}
            className={classNames('icon_container')}
          >
            <div
              className={classNames('icon', 'icon_left')}
              ref={prevRef}
            />
          </div>

          <div
            ref={nextRef}
            className={classNames('icon_container')}
          >
            <div
              className={classNames('icon', 'icon_right')}
              ref={nextRef}
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
          className="phoneSlider"
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
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
