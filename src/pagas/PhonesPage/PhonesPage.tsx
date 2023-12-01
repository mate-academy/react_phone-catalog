import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const phones = products.filter(
    (product: Product) => product.type === 'phone',
  );

  return (
    <div className="container">
      <BreadCrumbs />
      <h1 className="name__page">Mobile phones</h1>
      <p className="count__page">
        {`${phones.length} ${phones.length <= 1 ? 'model' : 'models'}`}
      </p>
      {phones.length
        && (
          <ProductList products={phones} />
        )}
    </div>
  );
};
