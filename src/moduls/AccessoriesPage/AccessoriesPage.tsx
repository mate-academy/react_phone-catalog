import { CategoryContainer } from '../../features/CategoryContainer';
import { useSortedProducts } from '../../shared/utils/hooks/useSortedProducts';
import { CategorySceleton } from '../../shared/components/CategorySceleton';

export const AccessoriesPage = () => {
  const { sortedProducts, isPageLoading } = useSortedProducts('accessories');

  return isPageLoading ? (
    <CategorySceleton />
  ) : (
    <CategoryContainer goods={sortedProducts} title="Accessories" />
  );
};
