import { Category } from '@/shared/api/Category';
import { useProducts } from '@/shared/api/hooks/useProducts';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { ProductsCatalog } from '@/shared/components/ProductsCatalog/ProductsCatalog';

type Props = {
  category: Category;
};

export const ProductsPage = ({ category }: Props) => {
  const { products, isLoading, hasError, reload } = useProducts(category);

  if (hasError) {
    return <ErrorMessage onReload={reload} />;
  }

  return (
    <ProductsCatalog
      title={category}
      products={products}
      category={category}
      isLoading={isLoading}
    />
  );
};
