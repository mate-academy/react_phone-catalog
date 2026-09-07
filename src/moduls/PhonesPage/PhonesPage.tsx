/* eslint-disable max-len */
import { CategoryContainer } from '../../features/CategoryContainer';
import { useFilteredProducts } from '../../shared/utils/hooks/useSortedProducts';
import { CategorySceleton } from '../../shared/components/CategorySceleton';

export const PhonesPage = () => {
  const { filteredProducts, isPageLoading, isError } =
    useFilteredProducts('phones');

  return isPageLoading ? (
    <CategorySceleton />
  ) : (
    <CategoryContainer
      filteredProducts={filteredProducts}
      title="Mobile phones"
      isError={isError}
    />
  );
};
