import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './HomePage.module.scss';
import { Product } from '../../../shared/types/types';
import { Welcome } from '../Welcome';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { translateItem } from '../../../shared/functions/functions';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { language, localeTexts } = useLanguage();
  const { newModels, hotPrices } = localeTexts;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('api/products.json');

      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }

      const loadedProducts = await response.json();

      setProducts(translateItem<Product>(loadedProducts, language));
    } catch (error) {
      throw error;
    }
  }, [language]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const brandNewProducts = useMemo(() => {
    const newestYear = products.reduce(
      (year, product) => (product.year > year ? product.year : year),
      0,
    );

    return products
      .filter(
        product =>
          product.year === newestYear || product.year === newestYear - 1,
      )
      .sort(
        (firstProduct, secondProduct) =>
          secondProduct.fullPrice - firstProduct.fullPrice,
      );
  }, [products]);

  const minDiscount = 0.1;

  const hotPriceProducts = useMemo(() => {
    return products
      .filter(
        product =>
          product.fullPrice - product.price > product.fullPrice * minDiscount,
      )
      .sort(
        (firstProduct, secondProduct) =>
          secondProduct.fullPrice -
          secondProduct.price -
          (firstProduct.fullPrice - firstProduct.price),
      );
  }, [products]);

  return (
    <main className={styles.HomePage}>
      <h1 className={styles.HiddenTitle}>Product Catalog</h1>
      <Welcome />
      <ProductsSlider title={newModels} products={brandNewProducts} />
      <ProductsSlider title={hotPrices} products={hotPriceProducts} />
    </main>
  );
};
