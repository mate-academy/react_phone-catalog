import { CategoryType } from '../../types/Category';
import { ProductList } from '../ProductList';

export const AccessoriesPage = () => {
  return (
    <ProductList category={CategoryType.Accessories} title="Accessories" />
  );
};
