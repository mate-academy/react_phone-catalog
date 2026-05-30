import React, { useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductItem } from '../ProductItem/ProductItem';
import { Products } from '../../../types/Products';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import arrowLeft from '../../../../public/img/icons/icon-arrow-left-black.svg';
import arrowR from '../../../../public/img/icons/icon-arrow-right-black.svg';

type Props = {
  title: string;
  products?: Products[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles['products-slider']}>
      <div className={styles['products-slider__container']}>
        <div className={styles['products-slider__wrapper']}>
          <h2 className={`${styles['products-slider__title']} title`}>
            {title}
          </h2>

          <div
            className={`${styles['products-slider__arrows']} ${styles.arrows}`}
          >
            <button ref={prevRef} className={styles.arrows__left}>
              <img src={arrowLeft} alt="arrow-left" />
            </button>
            <button ref={nextRef} className={styles.arrows__right}>
              <img src={arrowR} alt="arrow-right" />
            </button>
          </div>
        </div>
        <div className={styles['products-slider__phones']}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            freeMode={false}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: {
                slidesPerView: 'auto',
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {products &&
              products.map(product => (
                <SwiperSlide
                  className={styles['products-slider__slide']}
                  key={product.id}
                >
                  <ProductItem product={product} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
