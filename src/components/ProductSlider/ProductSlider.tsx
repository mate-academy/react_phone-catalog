import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import styles from './ProductSlider.module.scss';

import 'swiper/css';

import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useRef, useState } from 'react';
// import { asset } from '../../utils/paths';

import { ProductCardItem } from '../../types/ProductCardItem';

type Props = {
  name: string;
  items: ProductCardItem[];
  showDiscount?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  name,
  items,
  showDiscount,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  // console.log(products);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();

      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [items]);

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`${styles.sliderButton} ${
              isBeginning ? styles.disabled : styles.active
            }`}
            aria-label="Previous slide"
          >
            <img
              // src={asset(
              //   isBeginning
              //     ? '/img/icons/arrow-left.svg'
              //     : '/img/icons/arrow-left-action.svg',
              // )}
              src={
                isBeginning
                  ? '/img/icons/arrow-left.svg'
                  : '/img/icons/arrow-left-action.svg'
              }
              alt=""
            />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`${styles.sliderButton} ${
              isEnd ? styles.disabled : styles.active
            }`}
            aria-label="Next slide"
          >
            <img
              // src={asset(
              //   isEnd
              //     ? '/img/icons/arrow-right.svg'
              //     : '/img/icons/arrow-right-action.svg',
              // )}
              src={
                isEnd
                  ? '/img/icons/arrow-right.svg'
                  : '/img/icons/arrow-right-action.svg'
              }
              alt=""
            />
          </button>
        </div>
      </div>
      {items.length > 0 && (
        <div className={styles.fullBleed}>
          <Swiper
            // modules={[Navigation]}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={swiper => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            // navigation
            spaceBetween={16}
            // slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1.3 },
              640: { slidesPerView: 2.5 },
              1200: { slidesPerView: 4 },
            }}
          >
            {/* {products.slice(0, 20).map(product => ( */}
            {items.map(item => (
              <SwiperSlide key={item.id}>
                <ProductCard {...item} showDiscount={showDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};
