import { useTranslation } from 'react-i18next';

import { ProductsSlider } from '@/components/organisms/Product/ProductsSlider';

import { useProductByCategory } from '@/entities/product/model/product.queries';

import type { Category } from '@/shared/types/Category';

import { sortProductsBySimilarity } from './sortProductsBySimilarity';

type Props = {
  category: Category;
  currentProductId: number;
};

export const YouMayAlsoLike = ({ category, currentProductId }: Props) => {
  const { data: products = [] } = useProductByCategory(category);
  const { t } = useTranslation();

  const currentProduct = products.find(
    (product) => product.id === currentProductId,
  );

  const recommendedProducts = sortProductsBySimilarity(
    products.filter((product) => product.id !== currentProductId),
    currentProduct,
  ).slice(0, 10);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <ProductsSlider
      data={{
        sectionTitle: t('youMayAlsoLike'),
        productCards: recommendedProducts,
      }}
    />
  );
};
