import { NoResults } from '../../components/NoResults';
import { Search } from '../../components/Search';
import { getTablets } from '../../services/products';
import { useProducts } from '../../store/ProductsContext';

import './TabletsPage.scss';

export const TabletsPage = () => {
  const products = useProducts();
  const tablets = getTablets(products);

  if (!tablets.length) {
    return (
      <NoResults />
    );
  }

  return (
    <div className="tablets tablets__content">
      <Search type="mobile" />
    </div>
  );
};
