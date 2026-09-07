/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Product } from '../shared/types/Product';
import { t } from 'i18next';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

export const SuggestedProducts = () => {
  const getSuggestedProducts = async (count: number) => {
    const response = await fetch('./api/products.json');
    const products = await response.json();

    return products.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const suggested = await getSuggestedProducts(12);

      setProducts(suggested);
    };

    fetchProducts();
  }, []);

  return (
    <ProductsSlider
      title={t('You may also like')}
      productsToShow={products}
      discount={true}
    />
  );
};
