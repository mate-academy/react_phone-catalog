import { HTMLAttributes, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Product } from '@/shared/type';
import { useProducts } from '@/app/providers/Products';
import { ProductsSlider } from '@/components/ProductsSlider';

function getRandomProducts(products: Product[], lenght: number = 16): Product[] {
  const copyProducts = [...products];

  const randomProducts = Array.from({ length: Math.min(lenght, copyProducts.length) }).map(() => {
    const randomProduct = copyProducts.splice(
      Math.round(Math.random() * (copyProducts.length - 1)),
      1,
    )[0] as Product;

    return randomProduct;
  });

  return randomProducts;
}

export const SectionYouMayAlsoLike = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { products, loading, loadProducts } = useProducts();
  const { t } = useTranslation();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const suggestedProducts = useMemo<Product[]>(() => {
    if (!products) {
      return [];
    }

    return getRandomProducts(products, 16);
  }, [products]);

  return (
    <section {...props}>
      <ProductsSlider
        products={suggestedProducts}
        title={t('sectionYouMayAlsoLike')}
        lengthSlides={16}
        isLoading={loading}
      ></ProductsSlider>
    </section>
  );
};
