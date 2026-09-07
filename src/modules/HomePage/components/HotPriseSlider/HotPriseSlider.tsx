import { useCallback } from 'react';
import { useProducts } from '../../../../hooks/context/useProducts';
import { ProductSlider } from '../../../shared/components/ProductSlider';
import { ProductType } from '../../../../shared/types/ProductType';
import { useTranslation } from 'react-i18next';

export const HotPriseSlider = () => {
  const { products, loading } = useProducts();
  const { t } = useTranslation();

  const sortBySale = useCallback((i1: ProductType, i2: ProductType) => {
    const sale1 = i1.fullPrice - i1.price;
    const sale2 = i2.fullPrice - i2.price;

    return sale2 - sale1;
  }, []);
  return (
    <ProductSlider
      products={products}
      saleVisidle={true}
      title={t('home_page.hot_price_title')}
      sortFn={sortBySale}
      cardCount={20}
      loading={loading}
    />
  );
};
