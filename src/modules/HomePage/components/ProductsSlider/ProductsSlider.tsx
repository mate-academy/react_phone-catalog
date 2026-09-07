import styles from './ProductsSlider.module.scss';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import React, { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../../../shared';
import { Product } from '../../../../types/Product';

export type PriceView = 'default' | 'fullOnly';

type Props = {
  products: Product[];
  title: string;
  priceView?: PriceView;
};
export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  priceView,
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, []);

  const onInitHandler = swiper => {
    swiperRef.current = swiper;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const onSlideChangeHandler = swiper => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={styles.productsSlider}>
      <div className={styles['productsSlider-top']}>
        <p className={styles.title}>{title}</p>

        <div className={styles.navButtons}>
          <button
            ref={prevRef}
            className={`${styles.navButton} ${styles.prevButton} ${!isBeginning ? styles.isActive : ''}`}
          >
            <img src="img/icons/ChevronArrowLeft.svg" alt="Prev slide"></img>
          </button>

          <button
            ref={nextRef}
            className={`${styles.navButton} ${styles.nextButton} ${!isEnd ? styles.isActive : ''}`}
          >
            <img src="img/icons/ChevronArrowRight.svg" alt="Next slide"></img>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        spaceBetween={16}
        slidesPerView={1.4}
        breakpoints={{
          640: { slidesPerView: 2.5, spaceBetween: 24 },
          1200: { slidesPerView: 4, spaceBetween: 16 },
        }}
        onBeforeInit={swiper => {
          const navigation = {
            ...swiper.params.navigation,
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          };

          Object.assign(swiper.params, {
            ...swiper.params,
            navigation,
          });
        }}
        onInit={swiper => onInitHandler(swiper)}
        onSlideChange={swiper => onSlideChangeHandler(swiper)}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} priceView={priceView} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
