import React from 'react';
import { Product } from '../../../../types/product';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import ArrowNav from '../../icons/ArrowNav';
import { Direction } from '../../icons/ArrowNav/ArrowNav';

type Props = {
  items: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ items, title }) => {
  return (
    <>
      <span>
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.buttons}>
            <ArrowNav classname={'prevButton'} direction={Direction.Left} />
            <ArrowNav classname={'nextButton'} direction={Direction.Right} />
          </div>
        </div>
        <div className={styles.productSlider}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.nextButton',
              prevEl: '.prevButton',
            }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3 },
              960: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4 },
            }}
            className={styles.productSlider__swiper}
            loop={true && title !== 'Hot prices'}
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={index}
                className={styles['productSlider__swiper--slide']}
              >
                <ProductCard product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </span>
    </>
  );
};

export default ProductsSlider;
