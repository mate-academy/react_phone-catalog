import { ProductType } from '../../helpers/enums/ProductType';
import { ProductsPage } from './ProductsPage';

export const AccessoriesPage = () => (
  <ProductsPage categoryType={ProductType.accessories} />
);
