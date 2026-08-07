// #regionImport
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Intro } from './components/Intro';
import { ProductsSlider } from './components/ProductsSlider';
import { Container } from '@shared/components/Container';
import { Categories } from './components/Categories';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { SliderSkeleton } from '@shared/ui/Skeletons/SliderSkeleton';
import { FadeIn } from '@shared/ui/FadeIn';
import { useAppSelector } from '@src/app/hooks';
import {
  selectDiscountedProducts,
  selectNewestProducts,
} from '@src/features/products/selectors';
// #endregion

export const HomePage: React.FC = () => {
  const { isLoading, hasError } = useAppSelector(state => state.products);
  const { t } = useTranslation();

  const newestProducts = useAppSelector(selectNewestProducts);
  const hotPrices = useAppSelector(selectDiscountedProducts);

  return (
    <>
      <FadeIn>
        <Intro />
      </FadeIn>

      {!isLoading && hasError && (
        <Container>
          <ErrorMessage />
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
          <ErrorMessage />
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
