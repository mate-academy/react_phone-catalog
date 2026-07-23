// #regionImport
import React from 'react';
import { Intro } from './components/Intro';
import { ProductsSlider } from './components/ProductsSlider';
import { Container } from '@shared/components/Container';
import { Categories } from './components/Categories';
import {
  getDiscountedProducts,
  getNewestProducts,
} from '@shared/utils/sortProducts';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { SliderSkeleton } from '@shared/ui/Skeletons/SliderSkeleton';
import { FadeIn } from '@shared/ui/FadeIn';
import { useProducts } from './hooks/useProducts';
import { useTranslation } from 'react-i18next';
// #endregion

export const HomePage: React.FC = () => {
  const { products, isLoading, hasError, loadProducts } = useProducts();
  const { t } = useTranslation();

  const newestProducts = getNewestProducts(products);
  const hotPrices = getDiscountedProducts(products);

  return (
    <>
      <FadeIn>
        <Intro />
      </FadeIn>

      {!isLoading && hasError && (
        <Container>
          <ErrorMessage onReload={loadProducts} />
        </Container>
      )}

      {hasError ? null : isLoading ? (
        <SliderSkeleton />
      ) : (
        <FadeIn>
          <ProductsSlider
            title={t('homePage.brandNew')}
            products={newestProducts}
            showOldPrice={false}
          />
        </FadeIn>
      )}

      <Container>
        <FadeIn>
          <Categories />
        </FadeIn>
      </Container>

      {!isLoading && hasError && (
        <Container>
          <ErrorMessage onReload={loadProducts} />
        </Container>
      )}

      {hasError ? null : isLoading ? (
        <SliderSkeleton />
      ) : (
        <FadeIn>
          <ProductsSlider
            title={t('homePage.hotPrices')}
            products={hotPrices}
            showOldPrice={false}
          />
        </FadeIn>
      )}
    </>
  );
};
