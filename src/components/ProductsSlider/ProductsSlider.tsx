import { Product } from '../../types/Product';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.scss';
import { ProductCart } from '../ProductCart/ProductCart';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [init, setInit] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div className={styles.productsSlider}>
      <div className={styles.productsSlider__box}>
        <h1 className={styles.productsSlider__title}>{title}</h1>

        <div className={styles.productsSlider__controls}>
          <button
            ref={prevRef}
            className={styles.productsSlider__btnPrev}
            disabled={isPrevDisabled}
          >
            <img
              src={
                isPrevDisabled
                  ? 'icons/arrow-slider-disabled.svg'
                  : 'icons/arrow-slider.svg'
              }
              alt="Prev arrow button"
            />
          </button>
          <button
            ref={nextRef}
            className={styles.productsSlider__btnNext}
            disabled={isNextDisabled}
          >
            <img
              src={
                isNextDisabled
                  ? 'icons/arrow-slider-disabled.svg'
                  : 'icons/arrow-slider.svg'
              }
              alt="Next arrow button"
            />
          </button>
        </div>
      </div>

      {init && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={swiper => {
            setTimeout(() => {
              const nav = swiper.params.navigation;

              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }

              setIsPrevDisabled(swiper.isBeginning);
              setIsNextDisabled(swiper.isEnd);

              swiper.on('slideChange', () => {
                setIsPrevDisabled(swiper.isBeginning);
                setIsNextDisabled(swiper.isEnd);
              });
            });
          }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className={styles.productsSlider__swiper}
        >
          {products.map(product => (
            <SwiperSlide
              key={product.id}
              className={styles.productsSlider__item}
            >
              <ProductCart product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
