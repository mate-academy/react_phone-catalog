import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import styles from './ProductsSlider.module.scss';
import './ProductsSlider.module.scss';
import 'swiper/css';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  gadgets: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, gadgets }) => {
  const swiperRef = useRef<any>(null);
  const prevButtonRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (!swiper) {
      return;
    }

    const updateNavButtons = () => {
      if (prevButtonRef.current && nextButtonRef.current) {
        if (swiper.isBeginning) {
          prevButtonRef.current.classList.add(styles['swiper-button-disabled']);
        } else {
          prevButtonRef.current.classList.remove(
            styles['swiper-button-disabled'],
          );
        }

        if (swiper.isEnd) {
          nextButtonRef.current.classList.add(styles['swiper-button-disabled']);
        } else {
          nextButtonRef.current.classList.remove(
            styles['swiper-button-disabled'],
          );
        }
      }
    };

    swiper.on('slideChange', updateNavButtons);
    updateNavButtons();

    return () => {
      swiper.off('slideChange', updateNavButtons);
    };
  }, [gadgets.length]);

  return (
    <div className={styles.ProductsSlider}>
      <div className={styles.ProductsSlider__tittleContainer}>
        <h2 className={styles.ProductsSlider__tittle}>{title}</h2>

        <div className={styles.ProductsSlider__slideButtons}>
          <div
            id="card-slider-arrowLeft"
            ref={prevButtonRef}
            className={`${styles.ProductsSlider__slideButton}`}
          >
            <img
              className={styles.ProductsSlider__sliderArrow}
              src="icons/arrow-left-ico.svg"
              alt="arrowLeft"
            />
          </div>

          <div
            id="card-slider-arrowRight"
            ref={nextButtonRef}
            className={`${styles.ProductsSlider__slideButton}`}
          >
            <img
              className={styles.ProductsSlider__sliderArrow}
              src="icons/aroow-right-ico.svg"
              alt="arrowRight"
            />
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[FreeMode, Navigation]}
        navigation={{
          prevEl: '#card-slider-arrowLeft',
          nextEl: '#card-slider-arrowRight',
        }}
        freeMode={true}
        slidesPerView={'auto'}
        spaceBetween={16}
        className={styles.ProductsSlider__swiper}
      >
        {gadgets.map(gadget => (
          <SwiperSlide className={styles.ProductsSlider__slide} key={gadget.id}>
            <ProductCard gadget={gadget} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
