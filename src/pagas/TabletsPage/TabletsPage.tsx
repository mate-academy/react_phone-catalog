import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

export const TabletsPage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const tablets = products.filter(
    (product: Product) => product.type === 'tablet',
  );

  return (
    <div className="container">
      <h1>Mobile phones</h1>
      <p>{tablets.length}</p>
      {tablets.length
        && (
          <ProductList products={tablets} />
        )}
    </div>
  );
};
