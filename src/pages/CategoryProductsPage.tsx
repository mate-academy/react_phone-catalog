import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  StateContext,
} from '../libs/components/state-provider/state-context';
import {
  getCapitalizedString, getCategoryFromPath, getProductsByCategory,
} from '../libs/helpers';
import { Products } from './products/Products';

export const CategoryProductsPage: React.FC = () => {
  const { pathname } = useLocation();
  const { products } = useContext(StateContext);

  const category = getCategoryFromPath(pathname);
  const pageTitle = getCapitalizedString(category);
  const categoryProducts = getProductsByCategory(products, category);

  return (
    <Products
      pageTitle={pageTitle}
      products={categoryProducts}
    />
  );
};
