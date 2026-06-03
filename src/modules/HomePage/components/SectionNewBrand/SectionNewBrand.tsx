import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

import { Product } from '@/shared/type';

import { useProducts } from '@/app/providers/Products/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const SectionNewBrand = () => {
  const { products, loading, loadProducts } = useProducts();
  const { t } = useTranslation();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const NewBrandProduct = useMemo<Product[]>(() => {
    if (!products) {
      return [];
    }

    return products.sort(
      (productsA, productsB) =>
        productsB.year - productsA.year,
    );
  }, [products]);

  return (
    <section>
      <ProductsSlider
        products={NewBrandProduct}
        title={t('HomeTitle.newBrand')}
        lengthSlides={20}
        isLoading={loading}
      ></ProductsSlider>
    </section>
  );
};
