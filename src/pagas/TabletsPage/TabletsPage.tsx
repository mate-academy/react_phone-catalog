import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

import './TabletsPage.scss';

export const TabletsPage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const tablets = products.filter(
    (product: Product) => product.type === 'tablet',
  );

  return (
    <div className="container">
      <h1 className="name__page">Tablets</h1>
      <p className="count__page">
        {`${tablets.length} models`}
      </p>
      {tablets.length
        && (
          <ProductList products={tablets} />
        )}
    </div>
  );
};
