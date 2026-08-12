import { useMemo } from 'react';

import { BannerSlider } from '../../components/BannerSlider';
import { PageMessage } from '../../components/PageMessage';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { useProducts, useTranslation } from '../../hooks';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const t = useTranslation();

  const { products, isLoading, hasError } = useProducts();

  const latestProductYear = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.max(...products.map(product => product.year));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products
      .filter(product => product.year === latestProductYear)
      .sort((productA, productB) => {
        return productB.fullPrice - productA.fullPrice;
      })
      .slice(0, 10);
  }, [products, latestProductYear]);

  const hotPriceProducts = useMemo(() => {
    return products
      .filter(product => product.year !== latestProductYear)
      .sort((productA, productB) => {
        const discountA = productA.fullPrice - productA.price;
        const discountB = productB.fullPrice - productB.price;

        return discountB - discountA;
      })
      .slice(0, 10);
  }, [products, latestProductYear]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>{t.home.hiddenTitle}</h1>

      <p className={styles.title}>{t.home.title}</p>

      <BannerSlider />

      {hasError ? (
        <PageMessage
          title={t.common.somethingWentWrong}
          text={t.catalog.loadProductsError}
          actionText={t.common.reload}
          onAction={() => window.location.reload()}
        />
      ) : (
        <>
          <ProductsSlider
            title={t.home.brandNew}
            products={brandNewProducts}
            isLoading={isLoading}
            isBrandNewSection
          />

          <ShopByCategory products={products} />

          <ProductsSlider
            title={t.home.hotPrices}
            products={hotPriceProducts}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
