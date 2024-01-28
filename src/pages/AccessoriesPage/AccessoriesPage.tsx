import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

export const AccessoriesPage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const accessories = products.filter(
    (product: Product) => product.type === 'accessorie',
  );

  return (
    <div className="container">
      <BreadCrumbs />
      <h1 className="name__page">Accessories</h1>
      <p className="count__page">
        {`${accessories.length} ${accessories.length <= 1 ? 'model' : 'models'}`}
      </p>
      {accessories.length
        ? (
          <ProductList products={accessories} />
        ) : (
          <p className="no-goods">
            {'Regrettably, at this juncture, '}
            {' our store does not presently have any products'}
            {' available within this particular category.'}
          </p>
        )}
    </div>
  );
};
