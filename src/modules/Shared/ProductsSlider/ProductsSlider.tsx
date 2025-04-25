import styles from './ProductsSlider.module.scss';
import { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types/Product';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, []);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__top}>
        <h2 className={styles.slider__topTitle}>{title}</h2>

        <div className={styles.slider__topSwiper}>
          <button
            className={styles.slider__topSwipeButton}
            onClick={handlePrev}
            disabled={isBeginning}
          />
          <button
            className={styles.slider__topSwipeButton}
            onClick={handleNext}
            disabled={isEnd}
          />
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        breakpoints={{
          640: { slidesPerGroup: 2 },
          1200: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        speed={400}
        onSlideChange={handleSlideChange}
        className={styles.slider__productCardsContainer}
        ref={swiperRef}
      >
        {products.map(product => (
          <SwiperSlide
            key={product.id}
            className={styles.slider__productCardsSlide}
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
