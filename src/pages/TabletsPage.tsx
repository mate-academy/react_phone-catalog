import { useContext } from 'react';
import { NoResults } from '../components/NoResults/NoResults';
import { ProductBrowse } from '../components/ProductBrowse';
import { CatalogContext } from '../context';

export const TabletsPage = () => {
  const { products } = useContext(CatalogContext);
  const tablet = products.filter(product => product.type === 'tablet');

  return (
    <div className="container">
      {tablet.length > 0 ? (
        <ProductBrowse title="Tablets" products={tablet} />
      ) : (
        <NoResults name="Tablets" />
      )}
    </div>
  );
};
