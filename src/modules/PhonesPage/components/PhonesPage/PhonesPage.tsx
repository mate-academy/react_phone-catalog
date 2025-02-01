//import styles from './PhonePage.module.scss';

import { Category } from '../../../../_types/products';
import { ProductsPage } from '../../../ProductsPage/components/ProductsPage';

export const PhonesPage = () => {
  return (
    <>
      <h1>PhonePage</h1>
      <ProductsPage category={Category.phones} />
    </>
  );
};
