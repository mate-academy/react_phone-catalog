import { CategoryPage } from '@/shared/components/CategoryPage';
import { useProducts } from '@/shared/hooks/useProducts';
import { Categories } from '@/types/Categories';

export const PhonesPage = () => {
  const productsState = useProducts();

  const products = productsState.products.filter(
    product => product.category === Categories.Phones,
  );

  return (
    <CategoryPage
      products={products}
      title="Mobile phones"
      emptyMessage="There are no phones yet"
      isLoading={productsState.isLoading}
      hasError={productsState.hasError}
      reloadFunction={productsState.retryFetch}
    />
  );
};
