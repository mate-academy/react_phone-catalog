import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
// import { Navigation } from 'swiper/modules';
import styles from './ProductSlider.module.scss';

import 'swiper/css';
// import 'swiper/css/navigation';

import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useRef, useState } from 'react';
import { asset } from '../../utils/paths';

type Phones = {
  id: string;
  name: string;
  price: number;
  discount?: number;
  showDiscount?: boolean;
  image?: string;
  screen: string;
  capacity: string;
  ram: string;
};

type Props = {
  name: string;
  phones: Phones[];
  showDiscount?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  name,
  phones,
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
  }, [phones]);

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
              src={asset(
                isBeginning
                  ? 'img/icons/arrow-left.svg'
                  : 'img/icons/arrow-left-action.svg',
              )}
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
              src={asset(
                isEnd
                  ? 'img/icons/arrow-right.svg'
                  : 'img/icons/arrow-right-action.svg',
              )}
              alt=""
            />
          </button>
        </div>
      </div>
      {phones.length > 0 && (
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
            {phones.map(phone => (
              <SwiperSlide key={phone.id}>
                <ProductCard {...phone} showDiscount={showDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};
