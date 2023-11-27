import { useContext } from 'react';
import { NoResults } from '../components/NoResults/NoResults';
import { ProductBrowse } from '../components/ProductBrowse';
import { CatalogContext } from '../context';

export const PhonesPage = () => {
  const { products } = useContext(CatalogContext);
  const category = products.filter(product => product.type === 'smartphone');

  return (
    <div className="container">
      {!category.length ? (
        <NoResults name="Phones" />
      ) : (
        <ProductBrowse title="Mobile phones" products={category} />
      )}
    </div>
  );
};
