import { NoResults } from '../../components/NoResults';
import { Search } from '../../components/Search';
import { getTablets } from '../../services/products';
import { useProducts } from '../../store/ProductsContext';

import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const products = useProducts();
  const accessories = getTablets(products);

  if (!accessories.length) {
    return (
      <NoResults />
    );
  }

  return (
    <div className="accessories accessories__content">
      <Search type="mobile" />
    </div>
  );
};
