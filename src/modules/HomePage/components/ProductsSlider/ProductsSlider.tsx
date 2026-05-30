import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';
import styles from './styles.module.scss';
import { ProductCard } from '@/components/ProductCard';
import React, { useEffect, useRef, useState } from 'react';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Autoplay, Virtual } from 'swiper/modules';
import classNames from 'classnames';
import { Product } from '@/shared/type';
import '@/bones/registry';

type Props = {
  products: Product[];
  isLoading: boolean;
  title: string;
  lengthSlides: number;
};

export const ProductsSlider: React.FC<Props> = ({ lengthSlides, products, isLoading, title }) => {
  const swiperRef = useRef<SwiperType | null>(null);


  const ggg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ggg) {
      return;
    }
    console.log(ggg.current?.clientHeight);
  }, [products]);

  useEffect(() => {
    const onResize = () => {
      swiperRef.current?.update();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  

  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.titleBox}>
          <h2>{title}</h2>
          <div className={styles.buttonBox}>
            <ButtonSecond
              className={classNames(styles.button, styles.sliderButtonPrev)}
              rotate={180}
            ></ButtonSecond>
            <ButtonSecond
              className={classNames(styles.button, styles.sliderButtonNext)}
            ></ButtonSecond>
          </div>
        </div>
      </div>
      <div   ref={ggg} className={styles.swiperContainer}>
        <div>
          <Swiper 
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            virtual
            spaceBetween={16}
            slidesPerView={4 / 3}
            breakpoints={{
              640: {
                slidesPerView: 12 / 5,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 24 / 6,
                spaceBetween: 16,
              },
            }}
            onResize={(swiper) => {
              swiper.setTranslate(swiper.translate);
            }}
            navigation={{
              prevEl: `.${styles.sliderButtonPrev}`,
              nextEl: `.${styles.sliderButtonNext}`,
            }}
            // autoplay={
            //   isLoading
            //     ? {}
            //     : {
            //         delay: 3500,
            //         disableOnInteraction: true,
            //       }
            // }
            modules={[FreeMode, Navigation, Autoplay, Virtual]}
            className={styles.swiper}
          >
            <SwiperSlide>
              <div className={styles.divTest}>
                <h2>Hello!</h2>
                <h2>Hello!</h2>
                <h2>Hello!</h2>
                <h2>Hello!</h2>
              </div>
            </SwiperSlide>
            {/* {products.length !== 0 &&
              products.slice(0, lengthSlides).map((product) => (
                <SwiperSlide
                  className={styles.slide}
                  key={product.itemId}
                  virtualIndex={product.id}
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}

            {products.length === 0 &&
              Array.from({ length: lengthSlides }).map((_, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide} virtualIndex={index}>
                    <ProductCard />
                  </SwiperSlide>
                );
              })} */}
          </Swiper>
        </div>
      </div>
    </>
  );
};
