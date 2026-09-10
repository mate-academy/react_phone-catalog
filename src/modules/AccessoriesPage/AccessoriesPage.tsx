import { CategoryPage } from '@/shared/components/CategoryPage';
import { useProducts } from '@/shared/hooks/useProducts';
import { Categories } from '@/types/Categories';

export const AccessoriesPage = () => {
  const productsState = useProducts();

  const products = productsState.products.filter(
    product => product.category === Categories.Accessories,
  );

  return (
    <CategoryPage
      products={products}
      title="Accessories"
      emptyMessage="There are no accessories yet"
      isLoading={productsState.isLoading}
      hasError={productsState.hasError}
      reloadFunction={productsState.retryFetch}
    />
  );
};
