import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';
import styles from './styles.module.scss';
import { ProductCard } from '@/components/ProductCard';
import React, { useEffect, useRef } from 'react';

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
            virtual
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
            modules={[FreeMode, Navigation, Autoplay, Virtual]}
            className={styles.swiper}
          >
            {products &&
              products.slice(0, lengthSlides).map((product) => (
                <SwiperSlide
                  className={styles.slide}
                  key={product.itemId}
                  virtualIndex={product.id}
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}

            {isLoading &&
              Array.from({ length: lengthSlides }).map((_, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide} virtualIndex={index}>
                    <ProductCard />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
};
