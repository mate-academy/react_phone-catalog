import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';
import styles from './styles.module.scss';
import { ProductCard } from '@/components/ProductCard';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'boneyard-js/react';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Autoplay } from 'swiper/modules';
import classNames from 'classnames';
import {Product } from '@/shared/type';
import '@/bones/registry';

type Props = {
 products: Product[];
 isLoading: boolean;
 title: string;
}

export const ProductsSlider: React.FC<Props> = ({products, isLoading, title}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const onResize = () => {
      swiperRef.current?.update();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const hotProduct = useMemo<Product[]>(() => {
    if (!products) {
      return [];
    }

    return products.sort(
      (productsA, productsB) =>
        productsB.fullPrice - productsB.price - (productsA.fullPrice - productsA.price),
    );
  }, [products]);

  const defaultProduct: Product = {
    id: 2,
    category: 'phones',
    itemId: 'apple-iphone-7-plus-32gb-black',
    name: 'Apple iPhone 7 Plus 32GB Black',
    fullPrice: 540,
    price: 500,
    screen: "5.5' IPS",
    capacity: '32GB',
    color: 'black',
    ram: '3GB',
    year: 2016,
    image: 'img/phones/apple-iphone-7-plus/black/00.webp',
  };

  return (
    <section>
      <div className={styles.titleContainer}>
        <div className={styles.titleBox}>
          <h2>{title}</h2>
          <div className={styles.buttonBox}>
            <ButtonSecond
              className={classNames(styles.button, styles.sliderButtonPrev)}
              iconFlipX
            ></ButtonSecond>
            <ButtonSecond
              className={classNames(styles.button, styles.sliderButtonNext)}
            ></ButtonSecond>
          </div>
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            onResize={(swiper) => {
              swiper.setTranslate(swiper.translate);
            }}
            navigation={{
              prevEl: `.${styles.sliderButtonPrev}`,
              nextEl: `.${styles.sliderButtonNext}`,
            }}
            autoplay={
              isLoading
                ? {}
                : {
                    delay: 3500,
                    disableOnInteraction: true,
                  }
            }
            modules={[FreeMode, Navigation, Autoplay]}
            className={styles.swiper}
          >
            {products &&
              hotProduct.slice(0, 16).map((product) => (
                <SwiperSlide className={styles.slide} key={product.itemId}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}

            {isLoading &&
              Array.from({ length: 10 }).map((_, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide}>
                    <Skeleton
                      name="blog-card"
                      loading={true}
                      color="var(--text)"
                      darkColor="var(--text )"
                      animate="shimmer"
                    >
                      <ProductCard product={defaultProduct} />
                    </Skeleton>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
