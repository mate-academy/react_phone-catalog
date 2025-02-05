import { useMemo } from 'react';
import styles from './HomePage.module.scss';
import { Product } from '../../../shared/types/types';
import { Welcome } from '../Welcome';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
// eslint-disable-next-line max-len
import { ProductsSliderSkeleton } from '../../../shared/components/ProductsSliderSkeleton';
import { LoadingStatus } from '../../../shared/types/enums';
import { Categories } from '../Categories';
import { useDataLoader } from '../../../shared/hooks/useDataLoader';
import { productsFile } from '../../../shared/consts/apiFiles';

export const HomePage: React.FC = () => {
  const [products, loadingStatus, responseStatus, reload] =
    useDataLoader<Product>(productsFile);
  const { newModels, hotPrices } = useLanguage().localeTexts;

  const handleReloadClick = () => {
    reload();
  };

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
          {!!brandNewProducts.length && (
            <ProductsSlider
              title={newModels}
              titleHeadingLevel="h3"
              products={brandNewProducts}
            />
          )}

          <Categories products={products} loadingStatus={loadingStatus} />

          {!!hotPriceProducts.length && (
            <ProductsSlider
              title={hotPrices}
              titleHeadingLevel="h3"
              products={hotPriceProducts}
            />
          )}
        </>
      ) : (
        <>
          <ProductsSliderSkeleton
            title={newModels}
            titleHeadingLevel="h3"
            loadingStatus={loadingStatus}
            onReloadClick={handleReloadClick}
            responseStatus={responseStatus}
          />

          <Categories products={products} loadingStatus={loadingStatus} />

          <ProductsSliderSkeleton
            title={hotPrices}
            titleHeadingLevel="h3"
            loadingStatus={loadingStatus}
            onReloadClick={handleReloadClick}
            responseStatus={responseStatus}
          />
        </>
      )}
    </main>
  );
};
