import { useProductPage } from './model/useProductPage';
import { ProductPageMain } from './productPage';
import { ProductPageSkeleton } from './ui/ProductPageSkeleton';

export const ProductPage = () => {
  const { prod } = useProductPage();

  //make slider props only images and name
  return typeof prod === 'string' ? (
    <ProductPageSkeleton />
  ) : (
    <ProductPageMain prod={prod} />
  );
};
