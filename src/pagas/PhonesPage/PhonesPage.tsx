import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

export const PhonesPage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const phones = products.filter(
    (product: Product) => product.type === 'phone',
  );

  return (
    <div className="container">
      <h1>Mobile phones</h1>
      <p>{phones.length}</p>
      {phones.length
        && (
          <ProductList products={phones} />
        )}
    </div>
  );
};
