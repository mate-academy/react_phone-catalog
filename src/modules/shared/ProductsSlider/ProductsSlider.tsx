import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import { Product } from '../Product/Product';
import styles from './ProductsSlider.module.scss';
import { ProductInfo } from '../../../types/ProductInfo';
import { Skeleton } from '../Skeleton/Skeleton';
import { useAppSelector } from '../../../app/hooks';

SwiperCore.use([Navigation]);

type Props = {
  products: ProductInfo[];
  title: string;
  hasFullPrice: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  hasFullPrice,
}) => {
  const { loading, error } = useAppSelector(state => state.products);
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div className={`page__product-slider products-slider`}>
      <div className={styles['products-slider__container']}>
        <div className={styles['products-slider__header']}>
          <h2 className={`${styles['products-slider__title']} title`}>
            {title}
          </h2>

          <div className={styles['products-slider__navigation']}>
            <button
              className={cn(
                [styles['products-slider__button']],
                [styles['products-slider__button--prev']],
                {
                  [styles.disabled]: isBeginning,
                },
              )}
              onClick={() => swiperRef.current.slidePrev()}
            >
              <img src="/img/icons/arrow-left.svg" alt="Arrow Left" />
            </button>
            <button
              className={cn(
                [styles['products-slider__button']],
                [styles['products-slider__button--next']],
                {
                  [styles.disabled]: isEnd,
                },
              )}
              onClick={() => swiperRef.current.slideNext()}
            >
              <img src="/img/icons/arrow-right.svg" alt="Arrow Right" />
            </button>
          </div>
        </div>

        <div className={styles['products-slider__swiper']}>
          {error && <p>{error}</p>}

          {!error && (
            <Swiper
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              slidesPerGroup={2}
              slidesPerView={'auto'}
              centeredSlides={false}
              breakpoints={{
                0: { spaceBetween: 10 },
                640: { spaceBetween: 15 },
                1000: { spaceBetween: 16 },
              }}
            >
              {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ width: 'auto', maxWidth: '272px' }}
                  >
                    <Skeleton />
                  </SwiperSlide>
                ))}

              {!loading &&
                products.map(product => (
                  <SwiperSlide
                    key={product.id}
                    style={{ width: 'auto', maxWidth: '272px' }}
                  >
                    <Product product={product} hasFullPrice={hasFullPrice} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};
