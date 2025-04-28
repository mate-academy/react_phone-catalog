import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { RootState } from '../../../app/store';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../shared/ProductCard/ProductCard';
import styles from './MayLike.module.scss';

export const MayLike: React.FC = () => {
  const navigate = useNavigate();

  const allProducts = useSelector((state: RootState) => state.products.items);

  const shuffledProducts = useMemo(() => {
    return [...allProducts].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [allProducts]);

  const handleProductClick = (selectedProduct: Product) => {
    navigate(`/${selectedProduct.category}/${selectedProduct.itemId}`);
  };

  return (
    <section className={styles.mayLike}>
      <div className={styles.mayLike_container}>
        <h2 className={styles.mayLike_title}>You may also like</h2>
        <div className={styles.mayLike_buttons}>
          <button id="myPrev" className={styles.mayLike_buttonPrev} />
          <button id="myNext" className={styles.mayLike_buttonNext} />
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
        {shuffledProducts.slice(0, 10).map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard
              {...product}
              onClick={() => handleProductClick(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
