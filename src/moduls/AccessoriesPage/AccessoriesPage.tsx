/* eslint-disable max-len */
import { CategoryContainer } from '../../features/CategoryContainer';
import { useFilteredProducts } from '../../shared/utils/hooks/useSortedProducts';
import { CategorySceleton } from '../../shared/components/CategorySceleton';

export const AccessoriesPage = () => {
  const { filteredProducts, isPageLoading, isError } =
    useFilteredProducts('accessories');

  // const { sortedProducts } = useSortedProducts(filteredProducts);

  return isPageLoading ? (
    <CategorySceleton />
  ) : (
    <CategoryContainer
      filteredProducts={filteredProducts}
      title="Accessories"
      isError={isError}
    />
  );
};
