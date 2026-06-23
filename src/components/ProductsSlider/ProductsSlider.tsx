import React, { useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductItem } from '../ProductItem';
import { ProductType } from '../../types/ProductType';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { CartItem } from 'types/CartItem';

type Props = {
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  liked?: number[];
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
  title: string;
  filteredProducts: ProductType[];
};

export const ProductsSlider: React.FC<Props> = ({
  handleAddToCart,
  handleAddToLiked,
  liked,
  cart,
  handleRemoveFromCart,
  title,
  filteredProducts,
}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p className={styles.header_title}>{title}</p>
        <div className={styles.header_buttons}>
          <button
            ref={prevRef}
            className={styles.header_buttons_one}
            aria-label="Previous slide"
            type="button"
          >
            <img src="img/slider/arrow_left.svg" alt="Prev" />
          </button>
          <button
            ref={nextRef}
            className={styles.header_buttons_one}
            aria-label="Next slide"
            type="button"
          >
            <img src="img/slider/arrow_right.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.block}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView="auto"
          loop={false}
          grabCursor={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
          }}
          slidesPerGroup={1}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              slidesPerGroup: 2,
              spaceBetween: 16,
            },
            1240: {
              slidesPerView: 4.4,
              slidesPerGroup: 4,
              spaceBetween: 16,
            },
          }}
        >
          {filteredProducts.map(product => (
            <SwiperSlide key={product.id} className={styles.block_slider}>
              <ProductItem
                product={product}
                key={product.id}
                liked={liked}
                handleAddToCart={handleAddToCart}
                handleAddToLiked={handleAddToLiked}
                handleRemoveFromCart={handleRemoveFromCart}
                cart={cart}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
