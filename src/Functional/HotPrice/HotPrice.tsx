import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Products } from '../../types/Alltypes';
import styles from './HotPrice.module.scss';
import React, { useState, useEffect } from 'react';
import { getData } from '../../fetch/httpClient';
import { ProductCarts } from '../ProductCart/ProductCarts';
import { useCart } from '../../context/CartContext';

export const HotPrice: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { cart, totalQuantity, totalPrice } = useCart();

  useEffect(() => {
    getData<Products[]>('./api/products.json')
      .then(data => setProducts(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const withDiscount = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <div className={styles.containerHotPrice}>
      <div className={styles.hotPrice}>
        <h2>Hot prices</h2>
        <div className={styles.buttonsGroup}>
          <button className={styles.buttonHotPrice} id="hot-prev-button">
            <img
              src="/img/left.svg"
              alt="left"
              className={styles.hotPriceGroup}
            />
          </button>
          <button className={styles.buttonHotPrice} id="hot-next-button">
            <img
              src="/img/right.svg"
              alt="right"
              className={styles.hotPriceImg}
            />
          </button>
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          loop={false}
          className={styles.swiperNewBlock}
          navigation={{
            prevEl: '#hot-prev-button',
            nextEl: '#hot-next-button',
          }}
        >
          {withDiscount.length > 0 &&
            withDiscount.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCarts product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
