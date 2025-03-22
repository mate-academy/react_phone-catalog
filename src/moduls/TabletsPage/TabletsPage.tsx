/* eslint-disable max-len */
import { CategoryContainer } from '../../features/CategoryContainer';
import { CategorySceleton } from '../../shared/components/CategorySceleton';
import { useFilteredProducts } from '../../shared/utils/hooks/useSortedProducts';

export const TabletsPage = () => {
  const { filteredProducts, isPageLoading, isError } =
    useFilteredProducts('tablets');

  // const { sortedProducts } = useSortedProducts(filteredProducts);

  return isPageLoading ? (
    <CategorySceleton />
  ) : (
    <CategoryContainer
      filteredProducts={filteredProducts}
      title="Tablets"
      isError={isError}
    />
  );
};
