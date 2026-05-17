import { useProducts } from '../../../../hooks/context/useProducts';
import { ProductSlider } from '../../../shared/components/ProductSlider';
import { useCallback } from 'react';
import { ProductType } from '../../../../shared/types/ProductType';
import { useTranslation } from 'react-i18next';

export const NewModelSlider: React.FC = () => {
  const { products, loading } = useProducts();
  const { t } = useTranslation();

  const sortByYear = useCallback(
    (item1: ProductType, item2: ProductType) => item2.year - item1.year,
    [],
  );

  return (
    <ProductSlider
      products={products}
      title={<>{t('home_page.new_model_title')}</>}
      sortFn={sortByYear}
      cardCount={20}
      loading={loading}
    />
  );
};
