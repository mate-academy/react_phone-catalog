import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './HomePage.module.scss';
import { Product } from '../../../shared/types/types';
import { Welcome } from '../Welcome';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { translateItems, wait } from '../../../shared/functions/functions';
// eslint-disable-next-line max-len
import { ProductsSliderSkeleton } from '../../../shared/components/ProductsSliderSkeleton';
import { LoadingStatus } from '../../../shared/types/enums';
import { Categories } from '../Categories';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.Loading);
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined,
  );
  const { language, localeTexts } = useLanguage();
  const { newModels, hotPrices } = localeTexts;

  const handleReloadClick = () => {
    setLoadingStatus(LoadingStatus.Loading);
  };

  const fetchProducts = useCallback(async () => {
    setResponseStatus(undefined);

    try {
      await wait(2000);
      const response = await fetch('api/products.json');

      if (!response.ok) {
        setResponseStatus(response.status);
        throw new Error();
      }

      const loadedProducts = await response.json();

      setProducts(translateItems<Product>(loadedProducts, language));

      if (loadedProducts.length) {
        setLoadingStatus(LoadingStatus.Success);
      } else {
        setLoadingStatus(LoadingStatus.Error);
      }
    } catch {
      setLoadingStatus(LoadingStatus.Error);
    }
  }, [language]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.Loading) {
      fetchProducts();
    }
  }, [fetchProducts, loadingStatus]);

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
      {loadingStatus === LoadingStatus.Success ? (
        <>
          {brandNewProducts.length && (
            <ProductsSlider title={newModels} products={brandNewProducts} />
          )}

          <Categories products={products} loadingStatus={loadingStatus} />

          {hotPriceProducts.length && (
            <ProductsSlider title={hotPrices} products={hotPriceProducts} />
          )}
        </>
      ) : (
        <>
          <ProductsSliderSkeleton
            title={newModels}
            loadingStatus={loadingStatus}
            onReloadClick={handleReloadClick}
            responseStatus={responseStatus}
          />

          <Categories products={products} loadingStatus={loadingStatus} />

          <ProductsSliderSkeleton
            title={hotPrices}
            loadingStatus={loadingStatus}
            onReloadClick={handleReloadClick}
            responseStatus={responseStatus}
          />
        </>
      )}
    </main>
  );
};
