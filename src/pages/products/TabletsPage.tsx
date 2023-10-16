import { ProductType } from '../../helpers/enums/ProductType';
import { ProductsPage } from './ProductsPage';

export const TabletsPage = () => (
  <ProductsPage categoryType={ProductType.tablet} />
);
