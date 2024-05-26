import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { ShopCard } from '../ShopCard';
import React, { useRef } from 'react';
import { Product } from '../../utils/types/Product';
import styles from './ProductsSlider.module.scss';

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
        <h2 className={styles.productsSlider__title}>{title}</h2>
        <div className={styles.productsSlider__buttons}>
          <button
            ref={navigationPrevRef}
            className={
              (styles.productsSlider__button_prev,
              styles.productsSlider__button)
            }
          ></button>
          <button
            ref={navigationNextRef}
            className={`
              ${styles.productsSlider__button}
              productsSlider__button_next
            `}
          ></button>
        </div>
        <div className={styles.productsSlider__wrapper}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={16}
            navigation={{
              nextEl: navigationNextRef.current,
              prevEl: navigationPrevRef.current,
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
