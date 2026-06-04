import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Product } from '@/shared/type';
import { useProducts } from '@/app/providers/Products/ProductsContext';
import { ProductsSlider } from '@/components/ProductsSlider';

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
