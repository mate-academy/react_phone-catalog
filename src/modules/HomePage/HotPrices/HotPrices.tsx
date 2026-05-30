import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../shared/ProductCard/ProductCard';
import styles from './HotPrices.module.scss';

type Props = {
  products: Product[];
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();

  const sortedProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 10),
    [products],
  );

  const handleProductClick = (selectedProduct: Product) => {
    navigate(`/${selectedProduct.category}/${selectedProduct.itemId}`);
  };

  return (
    <section className={styles.hot}>
      <div className={styles.hot_container}>
        <h2 className={styles.hot_title}>Hot prices</h2>
        <div className={styles.hot_buttons}>
          <button id="myPrevHot" className={styles.hot_buttonPrev} />
          <button id="myNextHot" className={styles.hot_buttonNext} />
        </div>
      </div>

      <Swiper
        slidesPerView={1.4}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{ enabled: true }}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2.4, slidesPerGroup: 1, spaceBetween: 16 },
          1200: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 16 },
        }}
        navigation={{ nextEl: '#myNextHot', prevEl: '#myPrevHot' }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {sortedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard
              {...product}
              isNew={true}
              onClick={() => handleProductClick(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
