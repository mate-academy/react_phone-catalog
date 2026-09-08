import { CategoryType } from '../../types/Category';
import { ProductList } from '../ProductList';

export const PhonesPage = () => {
  return <ProductList category={CategoryType.Phones} title="Mobile phones" />;
};
