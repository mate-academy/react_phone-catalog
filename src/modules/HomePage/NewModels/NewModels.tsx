import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../../shared/ProductCard/ProductCard';
import styles from './NewModels.module.scss';

type Props = {
  products: Product[];
};

export const NewModels: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();

  const shuffledProducts = useMemo(
    () =>
      [...products]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 10),
    [products],
  );

  const handleProductClick = useCallback(
    (selectedProduct: Product) => {
      navigate(`/${selectedProduct.category}/${selectedProduct.itemId}`);
    },
    [navigate],
  );

  if (shuffledProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.new}>
      <div className={styles.new_container}>
        <h2 className={styles.new_title}>Brand new models</h2>
        <div className={styles.new_buttons}>
          <button type="button" id="myPrev" className={styles.new_buttonPrev} />
          <button type="button" id="myNext" className={styles.new_buttonNext} />
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
          640: {
            slidesPerView: 2.4,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        navigation={{ nextEl: '#myNext', prevEl: '#myPrev' }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {shuffledProducts.map(product => (
          <SwiperSlide key={product.itemId}>
            <ProductCard
              {...product}
              isNew={false}
              onClick={() => handleProductClick(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
