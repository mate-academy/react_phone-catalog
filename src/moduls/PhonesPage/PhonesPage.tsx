import { CategoryContainer } from '../../features/CategoryContainer';
import { useSortedProducts } from '../../shared/utils/hooks/useSortedProducts';
import { CategorySceleton } from '../../shared/components/CategorySceleton';

export const PhonesPage = () => {
  const { sortedProducts, isPageLoading } = useSortedProducts('phones');

  return isPageLoading ? (
    <CategorySceleton />
  ) : (
    <CategoryContainer goods={sortedProducts} title="Mobile phones" />
  );
};
