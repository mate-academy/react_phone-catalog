import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { ShopCard } from '../ShopCard';
import React, { useRef } from 'react';
import { Product } from '../../utils/types/Product';
import styles from './ProductsSlider.module.scss';
import { NavigationOptions } from 'swiper/types';
import arrow_right from './../../images/icons/arrow_right_filled.svg';
import arrow_left from './../../images/icons/arrow_left_filled.svg';

type Props = {
  products: Product[] | undefined;
  isDiscount: boolean;
  title?: string;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  isDiscount,
  title,
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <section className={styles.productsSlider}>
      <div className="container">
        <div className={styles.productsSlider__inner}>
          <h2 className={styles.productsSlider__title}>{title}</h2>
          <div className={styles.productsSlider__buttons}>
            <button
              ref={navigationPrevRef}
              className={
                (styles.productsSlider__button_prev,
                styles.productsSlider__button)
              }
            >
              <img src={arrow_left} alt="Arrow left" />
            </button>
            <button
              ref={navigationNextRef}
              className={`
              ${styles.productsSlider__button}
              productsSlider__button_next
            `}
            >
              <img src={arrow_right} alt="Arrow right" />
            </button>
          </div>
        </div>
        <div className={styles.productsSlider__wrapper}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={16}
            navigation={{
              nextEl: navigationNextRef.current,
              prevEl: navigationPrevRef.current,
            }}
            onInit={swiper => {
              const navigation = swiper.params.navigation as
                | NavigationOptions
                | undefined;

              if (navigation) {
                navigation.prevEl = navigationPrevRef.current;
                navigation.nextEl = navigationNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            breakpoints={{
              440: {
                slidesPerView: 1.5,
                spaceBetween: 4,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 8,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
          >
            {products?.map(product => (
              <SwiperSlide
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'auto',
                }}
                key={product.id}
              >
                <ShopCard product={product} isDiscount={isDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
