import { CategoryType } from '../../types/Category';
import { ProductList } from '../ProductList';

export const TabletsPage = () => {
  return <ProductList category={CategoryType.Tablets} title="Tablets" />;
};
