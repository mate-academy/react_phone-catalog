import { ProductType } from '../../helpers/enums/ProductType';
import { ProductsPage } from './ProductsPage';

export const PhonesPage = () => (
  <ProductsPage categoryType={ProductType.phone} />
);
