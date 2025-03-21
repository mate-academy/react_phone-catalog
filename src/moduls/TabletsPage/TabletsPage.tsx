import { CategoryContainer } from '../../features/CategoryContainer';
import { CategorySceleton } from '../../shared/components/CategorySceleton';
import { useSortedProducts } from '../../shared/utils/hooks/useSortedProducts';

export const TabletsPage = () => {
  const { sortedProducts, isPageLoading } = useSortedProducts('tablets');

  return isPageLoading ? (
    <CategorySceleton />
  ) : (
    <CategoryContainer goods={sortedProducts} title="Tablets" />
  );
};
