import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules

import { Product } from '@/shared/type';
// import '@/bones/registry';
import { useProducts } from '@/app/providers/Products/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const SectionHotPrice = () => {
  const { products, loading, loadProducts } = useProducts();
  const { t } = useTranslation();



  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const hotProduct = useMemo<Product[]>(() => {
    if (!products) {
      return [];
    }

    return products.sort(
      (productsA, productsB) =>
        productsB.fullPrice - productsB.price - (productsA.fullPrice - productsA.price),
    );
  }, [products]);

  return (
    <section >
      <ProductsSlider
        products={hotProduct}
        title={t('HomeTitle.hotPrice')}
        lengthSlides={16}
        isLoading={loading}
      ></ProductsSlider>
    </section>
  );
};
