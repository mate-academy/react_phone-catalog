import { CategoryPage } from '@/shared/components/CategoryPage';
import { useProducts } from '@/shared/hooks/useProducts';
import { Categories } from '@/types/Categories';

export const TabletsPage = () => {
  const productsState = useProducts();

  const products = productsState.products.filter(
    product => product.category === Categories.Tablets,
  );

  return (
    <CategoryPage
      products={products}
      title="Tablets"
      emptyMessage="There are no tablets yet"
      isLoading={productsState.isLoading}
      hasError={productsState.hasError}
      reloadFunction={productsState.retryFetch}
    />
  );
};
